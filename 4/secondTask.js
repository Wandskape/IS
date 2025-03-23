"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trisemusCipher = trisemusCipher;
var fs = require("fs");
var ALPHABET = "abcdefghijklmnopqrstuvwxyz";
var KEYWORD = "enigma";
var TABLE = generateTrisemusTable(ALPHABET, KEYWORD);
function trisemusCipher(originalTextPath, encryptedTextPath, isEncryption) {
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
            var encryptedText = stringTransformation(line, isEncryption);
            writeStream.write(encryptedText + '\n');
        }
    });
    readStream.on('end', function () {
        if (partialLine) {
            partialLine = partialLine.toLowerCase();
            var encryptedText = stringTransformation(partialLine, isEncryption);
            writeStream.write(encryptedText + '\n');
        }
        writeStream.end();
        console.log('Конец шифрования/дешифрования файла.');
    });
    readStream.on('error', function (err) { return console.error('Ошибка при чтении файла:', err); });
    writeStream.on('error', function (err) { return console.error('Ошибка при записи файла:', err); });
}
function stringTransformation(line, isEncryption) {
    var outputLine = "";
    for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
        var char = line_1[_i];
        var transformedChar = transformChar(char, isEncryption);
        outputLine += transformedChar;
    }
    return outputLine;
}
function transformChar(char, isEncryption) {
    var pos = TABLE.indexOf(char);
    if (pos === -1)
        return char;
    var row = Math.floor(pos / 5);
    var col = pos % 5;
    if (isEncryption) {
        row = (row + 1) % 5;
    }
    else {
        row = (row - 1 + 5) % 5;
    }
    return TABLE[row * 5 + col];
}
function generateTrisemusTable(alphabet, keyword) {
    var uniqueKey = "";
    for (var _i = 0, keyword_1 = keyword; _i < keyword_1.length; _i++) {
        var char = keyword_1[_i];
        if (!uniqueKey.includes(char))
            uniqueKey += char;
    }
    var remainingLetters = alphabet.split('').filter(function (c) { return !uniqueKey.includes(c); });
    var fullTable = uniqueKey + remainingLetters.join('');
    return fullTable;
}
