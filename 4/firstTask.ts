import * as fs from 'fs';
import {enAlphabet} from "./alphabets"
import {AssociativeArray} from "./main";

function codes(alphabet: string): number[] {
    const alphabetCodes: number[] = [];
    for (const char of alphabet) {
        alphabetCodes.push(char.charCodeAt(0));
    }
    return alphabetCodes;
}

let charArray: AssociativeArray = {}

for(const char of enAlphabet){
    charArray[char] = 0
}

function caesarModified(
    originalTextPath: string,
    encryptedTextPath: string,
    k: number,
    alphabetLength: number,
    alphabetDivisionCode: number,
    isEncryption: boolean
): AssociativeArray {
    let partialLine: string = "";
    const alphabetCodes: number[] = codes(enAlphabet);
    const readStream = fs.createReadStream(originalTextPath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(encryptedTextPath);

    readStream.on('data', (chunk: string) => {
        chunk = partialLine + chunk;
        const lines: string[] = chunk.split(/\r?\n/);
        partialLine = lines.pop() || '';

        for (let line of lines) {
            line = line.toLowerCase();
            for (const char of line) {
                if (alphabetCodes.includes(char.charCodeAt(0))) {
                    charArray[char]++;
                }
            }
            let encryptedText = stringTransformation(line, k, alphabetLength, alphabetDivisionCode, isEncryption);
            writeStream.write(encryptedText + '\n');
        }
    });

    readStream.on('end', () => {
        if (partialLine) {
            partialLine = partialLine.toLowerCase();
            let encryptedText = stringTransformation(partialLine, k, alphabetLength, alphabetDivisionCode, isEncryption);
            writeStream.write(encryptedText + '\n');
        }
        writeStream.end();
        console.log('Конец шифрования файла.');
    });

    readStream.on('error', (err: Error) => console.error('Ошибка при чтении файла:', err));
    writeStream.on('error', (err: Error) => console.error('Ошибка при записи файла:', err));
    return charArray
}

function stringTransformation(
    line: string,
    k: number,
    alphabetLength: number,
    alphabetDivisionCode: number,
    isEncryption: boolean
): string {
    let outputLine = "";
    let symbolCode: number;

    for (let char of line) {
        const charCode = char.charCodeAt(0);
        const charIndex = charCode - alphabetDivisionCode;

        if (charIndex < 0 || charIndex >= alphabetLength) {
            outputLine += char;
            continue;
        }

        if (isEncryption) {
            symbolCode = (charIndex + k + alphabetLength) % alphabetLength;
        } else {
            symbolCode = (charIndex - k + alphabetLength) % alphabetLength;
        }

        outputLine += String.fromCharCode(symbolCode + alphabetDivisionCode);
    }
    return outputLine;
}

export { caesarModified };
