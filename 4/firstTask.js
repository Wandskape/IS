"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caesarModified = caesarModified;
var fs = require("fs");
var alphabets_1 = require("./alphabets");
function codes(alphabet) {
    var alphabetCodes = [];
    for (var _i = 0, alphabet_1 = alphabet; _i < alphabet_1.length; _i++) {
        var char = alphabet_1[_i];
        alphabetCodes.push(char.charCodeAt(0));
    }
    return alphabetCodes;
}
var charArray = {};
for (var _i = 0, enAlphabet_1 = alphabets_1.enAlphabet; _i < enAlphabet_1.length; _i++) {
    var char = enAlphabet_1[_i];
    charArray[char] = 0;
}
function caesarModified(originalTextPath, encryptedTextPath, k, alphabetLength, alphabetDivisionCode, isEncryption) {
    var partialLine = "";
    var alphabetCodes = codes(alphabets_1.enAlphabet);
    var readStream = fs.createReadStream(originalTextPath, { encoding: 'utf8' });
    var writeStream = fs.createWriteStream(encryptedTextPath);
    readStream.on('data', function (chunk) {
        chunk = partialLine + chunk;
        var lines = chunk.split(/\r?\n/);
        partialLine = lines.pop() || '';
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            line = line.toLowerCase();
            for (var _a = 0, line_1 = line; _a < line_1.length; _a++) {
                var char = line_1[_a];
                if (alphabetCodes.includes(char.charCodeAt(0))) {
                    charArray[char]++;
                }
            }
            var encryptedText = stringTransformation(line, k, alphabetLength, alphabetDivisionCode, isEncryption);
            writeStream.write(encryptedText + '\n');
        }
    });
    readStream.on('end', function () {
        if (partialLine) {
            partialLine = partialLine.toLowerCase();
            var encryptedText = stringTransformation(partialLine, k, alphabetLength, alphabetDivisionCode, isEncryption);
            writeStream.write(encryptedText + '\n');
        }
        writeStream.end();
        console.log('Конец шифрования файла.');
    });
    readStream.on('error', function (err) { return console.error('Ошибка при чтении файла:', err); });
    writeStream.on('error', function (err) { return console.error('Ошибка при записи файла:', err); });
    return charArray;
}
function stringTransformation(line, k, alphabetLength, alphabetDivisionCode, isEncryption) {
    var outputLine = "";
    var symbolCode;
    for (var _i = 0, line_2 = line; _i < line_2.length; _i++) {
        var char = line_2[_i];
        var charCode = char.charCodeAt(0);
        var charIndex = charCode - alphabetDivisionCode;
        if (charIndex < 0 || charIndex >= alphabetLength) {
            outputLine += char;
            continue;
        }
        if (isEncryption) {
            symbolCode = (charIndex + k + alphabetLength) % alphabetLength;
        }
        else {
            symbolCode = (charIndex - k + alphabetLength) % alphabetLength;
        }
        outputLine += String.fromCharCode(symbolCode + alphabetDivisionCode);
    }
    return outputLine;
}
