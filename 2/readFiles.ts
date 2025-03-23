import * as fs from "fs";

import { AssociativeArray } from "./main";

function codes(alphabet: string): number[] {
    const alphabetCodes: number[] = [];
    for (const char of alphabet) {
        alphabetCodes.push(char.charCodeAt(0));
    }
    return alphabetCodes;
}

function symbolCount(charArray: AssociativeArray, alphabet: string, filePath: string): AssociativeArray {
    const alphabetCodes: number[] = codes(alphabet);

    const buffer = Buffer.alloc(1024);
    const fd = fs.openSync(filePath, 'r');
    let bytesRead: number;
    let partialLine = '';

    console.log('Начало чтения файла.');
    while ((bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null)) !== 0) {
        let chunk = buffer.toString('utf8', 0, bytesRead);
        chunk = partialLine + chunk;

        const lines = chunk.split(/\r?\n/);
        partialLine = lines.pop() || '';

        for (let line of lines) {
            line = line.toLowerCase();
            for (const char of line) {
                if (alphabetCodes.includes(char.charCodeAt(0))) {
                    charArray[char]++;
                }
            }
        }
    }

    if (partialLine) {
        partialLine = partialLine.toLowerCase();
        for (const char of partialLine) {
            if (alphabetCodes.includes(char.charCodeAt(0))) {
                charArray[char]++;
            }
        }
    }

    fs.closeSync(fd);
    console.log('Чтение файла завершено.');

    return charArray;
}

export { symbolCount };


