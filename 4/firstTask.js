"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caesarModified = caesarModified;
var fs = require("fs");
function caesarModified(originalTextPath, encryptedTextPath, k, alphabetLength, alphabetDivisionCode, isEncryption) {
    var partialLine = "";
    var readStream = fs.createReadStream(originalTextPath, { encoding: 'utf8' });
    var writeStream = fs.createWriteStream(encryptedTextPath);
    readStream.on('data', function (chunk) {
        chunk = partialLine + chunk;
        var lines = chunk.split(/\r?\n/);
        partialLine = lines.pop() || '';
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            line = line.toLowerCase();
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
}
function stringTransformation(line, k, alphabetLength, alphabetDivisionCode, isEncryption) {
    var outputLine = "";
    var symbolCode;
    for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
        var char = line_1[_i];
        var charCode = char.charCodeAt(0);
        var charIndex = charCode - alphabetDivisionCode;
        if (charIndex < 0 || charIndex >= alphabetLength) {
            // Символ вне диапазона алфавита — оставляем его без изменений
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
