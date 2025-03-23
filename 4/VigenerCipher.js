"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VigenerCipher = VigenerCipher;
exports.stringEncryption = stringEncryption;
exports.stringDecryption = stringDecryption;
var fs = require("fs");
function VigenerCipher(alphabetLength, alphabetDivisionCode, key, originalTextPath, encryptedTextPath) {
    var partialLine = "";
    var keyIndex = 0;
    console.log('Начало шифрования файла.');
    var readStream = fs.createReadStream(originalTextPath, { encoding: 'utf8' });
    var writeStream = fs.createWriteStream(encryptedTextPath);
    readStream.on('data', function (chunk) {
        chunk = partialLine + chunk;
        var lines = chunk.split(/\r?\n/);
        partialLine = lines.pop() || '';
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            line = line.toLowerCase();
            var _a = stringDecryption(line, key, keyIndex, alphabetDivisionCode, alphabetLength), encryptedText = _a.encryptedText, newKeyIndex = _a.newKeyIndex;
            keyIndex = newKeyIndex;
            writeStream.write(encryptedText + '\n');
        }
    });
    readStream.on('end', function () {
        if (partialLine) {
            partialLine = partialLine.toLowerCase();
            var _a = stringDecryption(partialLine, key, keyIndex, alphabetDivisionCode, alphabetLength), encryptedText = _a.encryptedText, newKeyIndex = _a.newKeyIndex;
            keyIndex = newKeyIndex;
            writeStream.write(encryptedText + '\n');
        }
        writeStream.end();
        console.log('Конец шифрования файла.');
    });
    readStream.on('error', function (err) { return console.error('Ошибка при чтении файла:', err); });
    writeStream.on('error', function (err) { return console.error('Ошибка при записи файла:', err); });
}
function stringEncryption(line, key, keyIndex, alphabetDivisionCode, alphabetLength) {
    var outputLine = "";
    for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
        var char = line_1[_i];
        var keyChar = key[keyIndex % key.length];
        var charCode = char.charCodeAt(0);
        var keyCharCode = keyChar.charCodeAt(0);
        var symbolCode = void 0;
        symbolCode = (charCode - alphabetDivisionCode + keyCharCode - alphabetDivisionCode) % alphabetLength;
        if (symbolCode < 0)
            symbolCode += alphabetLength;
        outputLine += String.fromCharCode(symbolCode + alphabetDivisionCode);
        keyIndex++;
    }
    return { encryptedText: outputLine, newKeyIndex: keyIndex };
}
function stringDecryption(line, key, keyIndex, alphabetDivisionCode, alphabetLength) {
    var outputLine = "";
    for (var _i = 0, line_2 = line; _i < line_2.length; _i++) {
        var char = line_2[_i];
        var keyChar = key[keyIndex % key.length];
        var charCode = char.charCodeAt(0) - alphabetDivisionCode;
        var keyCharCode = keyChar.charCodeAt(0) - alphabetDivisionCode;
        var symbolCode = (charCode - keyCharCode + alphabetLength) % alphabetLength;
        outputLine += String.fromCharCode(symbolCode + alphabetDivisionCode);
        keyIndex++;
    }
    return { encryptedText: outputLine, newKeyIndex: keyIndex };
}
