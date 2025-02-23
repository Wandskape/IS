"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbolCount = symbolCount;
var fs = require("fs");
function codes(alphabet) {
    var alphabetCodes = [];
    for (var _i = 0, alphabet_1 = alphabet; _i < alphabet_1.length; _i++) {
        var char = alphabet_1[_i];
        alphabetCodes.push(char.charCodeAt(0));
    }
    return alphabetCodes;
}
function symbolCount(charArray, alphabet, filePath) {
    var alphabetCodes = codes(alphabet);
    var buffer = Buffer.alloc(1024);
    var fd = fs.openSync(filePath, 'r');
    var bytesRead;
    var partialLine = '';
    console.log('Начало чтения файла.');
    while ((bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null)) !== 0) {
        var chunk = buffer.toString('utf8', 0, bytesRead);
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
        }
    }
    if (partialLine) {
        partialLine = partialLine.toLowerCase();
        for (var _b = 0, partialLine_1 = partialLine; _b < partialLine_1.length; _b++) {
            var char = partialLine_1[_b];
            if (alphabetCodes.includes(char.charCodeAt(0))) {
                charArray[char]++;
            }
        }
    }
    fs.closeSync(fd);
    console.log('Чтение файла завершено.');
    return charArray;
}
