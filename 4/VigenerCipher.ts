import * as fs from 'fs';

function VigenerCipher(
    alphabetLength: number,
    alphabetDivisionCode: number,
    key: string,
    originalTextPath: string,
    encryptedTextPath: string
): void {
    let partialLine: string = "";
    let keyIndex: number = 0;

    console.log('Начало шифрования файла.');
    const readStream = fs.createReadStream(originalTextPath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(encryptedTextPath);

    readStream.on('data', (chunk: string) => {
        chunk = partialLine + chunk;
        const lines: string[] = chunk.split(/\r?\n/);
        partialLine = lines.pop() || '';

        for (let line of lines) {
            line = line.toLowerCase();
            const { encryptedText, newKeyIndex } = stringDecryption(line, key, keyIndex, alphabetDivisionCode, alphabetLength);
            keyIndex = newKeyIndex;
            writeStream.write(encryptedText + '\n');
        }
    });

    readStream.on('end', () => {
        if (partialLine) {
            partialLine = partialLine.toLowerCase();
            const { encryptedText, newKeyIndex } = stringDecryption(partialLine, key, keyIndex, alphabetDivisionCode, alphabetLength);
            keyIndex = newKeyIndex;
            writeStream.write(encryptedText + '\n');
        }
        writeStream.end();
        console.log('Конец шифрования файла.');
    });

    readStream.on('error', (err: Error) => console.error('Ошибка при чтении файла:', err));
    writeStream.on('error', (err: Error) => console.error('Ошибка при записи файла:', err));
}

function stringEncryption(
    line: string,
    key: string,
    keyIndex: number,
    alphabetDivisionCode: number,
    alphabetLength: number
): { encryptedText: string, newKeyIndex: number } {
    let outputLine = "";

    for (const char of line) {
        const keyChar = key[keyIndex % key.length];
        const charCode = char.charCodeAt(0);
        const keyCharCode = keyChar.charCodeAt(0);
        let symbolCode;


        symbolCode = (charCode - alphabetDivisionCode + keyCharCode - alphabetDivisionCode) % alphabetLength;

        if (symbolCode < 0) symbolCode += alphabetLength;

        outputLine += String.fromCharCode(symbolCode + alphabetDivisionCode);
        keyIndex++;
    }

    return { encryptedText: outputLine, newKeyIndex: keyIndex };
}

function stringDecryption(
    line: string,
    key: string,
    keyIndex: number,
    alphabetDivisionCode: number,
    alphabetLength: number
): { encryptedText: string, newKeyIndex: number } {
    let outputLine = "";

    for (const char of line) {
        const keyChar = key[keyIndex % key.length];
        const charCode = char.charCodeAt(0) - alphabetDivisionCode;
        const keyCharCode = keyChar.charCodeAt(0) - alphabetDivisionCode;

        let symbolCode = (charCode - keyCharCode + alphabetLength) % alphabetLength;

        outputLine += String.fromCharCode(symbolCode + alphabetDivisionCode);
        keyIndex++;
    }

    return { encryptedText: outputLine, newKeyIndex: keyIndex };
}


export {VigenerCipher, stringEncryption, stringDecryption}