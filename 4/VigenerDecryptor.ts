import * as fs from 'fs';

function VigenerDecryptor(encryptedTextPath: string, decryptedTextPath: string): void {
    const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
    const ALPHABET_LENGTH = ALPHABET.length;

    const encryptedText = fs.readFileSync(encryptedTextPath, { encoding: 'utf8' }).replace(/\r?\n/g, '').toLowerCase();

    console.log('Начало дешифрования...');

    // функция для анализа длины ключа
    function analyzeKeyLength(text: string, maxKeyLength: number): number {
        let probableKeyLength = 1;
        let maxCoincidenceIndex = 0;

        for (let keyLength = 1; keyLength <= maxKeyLength; keyLength++) {
            // разбиение на строки, где в каждой строке находятся символы относительно длины ключа
            const substrings = Array.from({ length: keyLength }, (_, i) => text.split('').filter((_, index) => index % keyLength === i).join(''));

            const coincidenceIndex = substrings.reduce((sum, substr) => {
                // подсчёт частоты символов в подстроке
                const freq = substr.split('').reduce((acc, char) => ({ ...acc, [char]: (acc[char] || 0) + 1 }), {} as Record<string, number>);
                const substrLength = substr.length;
                return sum + Object.values(freq).reduce((acc, f) => acc + (f * (f - 1)) / (substrLength * (substrLength - 1)), 0);
            }, 0) / substrings.length;

            // обновление длины ключа если частотный анализ показал лучший результат
            if (coincidenceIndex > maxCoincidenceIndex) {
                maxCoincidenceIndex = coincidenceIndex;
                probableKeyLength = keyLength;
            }
        }
        return probableKeyLength;
    }

    // функция для нахождения ключа
    function findKey(text: string, keyLength: number): string {
        let key = '';
        for (let i = 0; i < keyLength; i++) {

            // разбиение на строки, где в каждой строке находятся символы относительно длины ключа
            const substring = text.split('').filter((_, index) => index % keyLength === i).join('');
            // подсчёт частоты символов для каждой строки
            const freq = substring.split('').reduce((acc, char) => ({ ...acc, [char]: (acc[char] || 0) + 1 }), {} as Record<string, number>);
            // нахождение самого частовстречающегося символа
            const mostFrequentChar = Object.entries(freq).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
            // вычисление символа ключа, используя сдвиг относительно буквы e
            const keyChar = String.fromCharCode(((mostFrequentChar.charCodeAt(0) - 'e'.charCodeAt(0) + ALPHABET_LENGTH) % ALPHABET_LENGTH) + 'a'.charCodeAt(0));
            key += keyChar;
        }

        // удаление дублирующейся части ключа
        for (let length = 1; length <= key.length; length++) {
            const candidate = key.slice(0, length);
            if (candidate.repeat(Math.ceil(key.length / length)).startsWith(key)) {
                return candidate;
            }
        }

        return key;
    }


    // расшифрование текста
    function decrypt(text: string, key: string): string {
        let decryptedText = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = (text.charCodeAt(i) - key.charCodeAt(i % key.length) + ALPHABET_LENGTH) % ALPHABET_LENGTH;
            decryptedText += String.fromCharCode(charCode + 'a'.charCodeAt(0));
        }
        return decryptedText;
    }

    const keyLength = analyzeKeyLength(encryptedText, 20); // Предполагаем максимальную длину ключа 20
    const key = findKey(encryptedText, keyLength);

    console.log(`Найден ключ: ${key}`);

    const decryptedText = decrypt(encryptedText, key);

    fs.writeFileSync(decryptedTextPath, decryptedText, { encoding: 'utf8' });

    console.log('Расшифровка завершена.');
}

export {VigenerDecryptor}

