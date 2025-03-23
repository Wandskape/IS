import * as fs from 'fs';

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const KEYWORD = "enigma";
const TABLE = generateTrisemusTable(ALPHABET, KEYWORD);

function trisemusCipher(
    originalTextPath: string,
    encryptedTextPath: string,
    isEncryption: boolean
): void {
    let partialLine: string = "";

    const readStream = fs.createReadStream(originalTextPath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(encryptedTextPath);

    readStream.on('data', (chunk: string) => {
        chunk = partialLine + chunk;
        const lines: string[] = chunk.split(/\r?\n/);
        partialLine = lines.pop() || '';

        for (let line of lines) {
            line = line.toLowerCase();
            let encryptedText = stringTransformation(line, isEncryption);
            writeStream.write(encryptedText + '\n');
        }
    });

    readStream.on('end', () => {
        if (partialLine) {
            partialLine = partialLine.toLowerCase();
            let encryptedText = stringTransformation(partialLine, isEncryption);
            writeStream.write(encryptedText + '\n');
        }
        writeStream.end();
        console.log('Конец шифрования/дешифрования файла.');
    });

    readStream.on('error', (err: Error) => console.error('Ошибка при чтении файла:', err));
    writeStream.on('error', (err: Error) => console.error('Ошибка при записи файла:', err));
}

function stringTransformation(line: string, isEncryption: boolean): string {
    let outputLine = "";

    for (let char of line) {
        let transformedChar = transformChar(char, isEncryption);
        outputLine += transformedChar;
    }
    return outputLine;
}

function transformChar(char: string, isEncryption: boolean): string {
    let pos = TABLE.indexOf(char);
    if (pos === -1)
        return char;

    let row = Math.floor(pos / 5);
    let col = pos % 5;

    if (isEncryption) {
        row = (row + 1) % 5;
    } else {
        row = (row - 1 + 5) % 5;
    }

    return TABLE[row * 5 + col];
}

function generateTrisemusTable(alphabet: string, keyword: string): string {
    let uniqueKey = "";
    for (let char of keyword) {
        if (!uniqueKey.includes(char)) uniqueKey += char;
    }

    let remainingLetters = alphabet.split('').filter(c => !uniqueKey.includes(c));
    let fullTable = uniqueKey + remainingLetters.join('');
    return fullTable;
}

export { trisemusCipher };
