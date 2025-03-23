"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeRouteCipher = snakeRouteCipher;
var fs = require("fs");
function snakeRouteCipher(inputPath, outputPath, mode) {
    var startTime = Date.now();
    var text = fs.readFileSync(inputPath, { encoding: 'utf8' })
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/\s/g, '')
        .toLowerCase();
    var COLS = 10;
    var ROWS = Math.ceil(text.length / COLS);
    var result = '';
    if (mode === 'encrypt') {
        var table = Array.from({ length: ROWS }, function () { return Array(COLS).fill(' '); });
        var index = 0;
        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++) {
                if (index < text.length) {
                    var col = i % 2 === 0 ? j : COLS - 1 - j;
                    table[i][col] = text[index++];
                }
            }
        }
        result = table.flat().join('');
    }
    else if (mode === 'decrypt') {
        var table = Array.from({ length: ROWS }, function () { return Array(COLS).fill(' '); });
        var index = 0;
        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++) {
                var col = i % 2 === 0 ? j : COLS - 1 - j;
                if (index < text.length) {
                    table[i][col] = text[index++];
                }
            }
        }
        for (var j = 0; j < COLS; j++) {
            for (var i = 0; i < ROWS; i++) {
                if (table[i][j] !== ' ') {
                    result += table[i][j];
                }
            }
        }
    }
    var freq = {};
    result.split('').forEach(function (char) {
        freq[char] = (freq[char] || 0) + 1;
    });
    fs.writeFileSync(outputPath, result, { encoding: 'utf8' });
    var endTime = Date.now();
    console.log("\u0427\u0430\u0441\u0442\u043E\u0442\u0430 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432:", freq);
    console.log("\u041C\u0430\u0440\u0448\u0440\u0443\u0442\u043D\u0430\u044F \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 (".concat(mode, "): ").concat(endTime - startTime, " \u043C\u0441"));
}
