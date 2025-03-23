"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiplePermutationCipher = multiplePermutationCipher;
var fs = require("fs");
function multiplePermutationCipher(inputPath, outputPath, mode, rowKey, colKey) {
    var startTime = Date.now();
    var text = fs.readFileSync(inputPath, { encoding: 'utf8' })
        .replace(/\s/g, '') // Удаляем пробелы
        .toLowerCase(); // Приводим к нижнему регистру
    var ROWS = rowKey.length;
    var COLS = colKey.length;
    var tableSize = ROWS * COLS;
    // Если длина текста меньше таблицы, добавляем заполнитель '*'
    if (mode === 'encrypt') {
        while (text.length % tableSize !== 0) {
            text += '*';
        }
    }
    var result = '';
    var rowOrder = rowKey.split('').map(function (_, i) { return i; }).sort(function (a, b) { return rowKey[a].localeCompare(rowKey[b]); });
    var colOrder = colKey.split('').map(function (_, i) { return i; }).sort(function (a, b) { return colKey[a].localeCompare(colKey[b]); });
    if (mode === 'encrypt') {
        var table_1 = Array.from({ length: ROWS }, function () { return Array(COLS).fill(' '); });
        var index = 0;
        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++) {
                if (index < text.length) {
                    table_1[i][j] = text[index++];
                }
            }
        }
        var permutedTable = rowOrder.map(function (row) { return colOrder.map(function (col) { return table_1[row][col]; }); });
        result = permutedTable.flat().join('');
    }
    else if (mode === 'decrypt') {
        var permutedTable = Array.from({ length: ROWS }, function () { return Array(COLS).fill(' '); });
        var index = 0;
        for (var _i = 0, rowOrder_1 = rowOrder; _i < rowOrder_1.length; _i++) {
            var row = rowOrder_1[_i];
            for (var _a = 0, colOrder_1 = colOrder; _a < colOrder_1.length; _a++) {
                var col = colOrder_1[_a];
                if (index < text.length) {
                    permutedTable[row][col] = text[index++];
                }
            }
        }
        result = permutedTable.map(function (row) { return row.join(''); }).join('');
        result = result.replace(/\*+$/g, ''); // Удаляем заполнители
    }
    var freq = {};
    result.split('').forEach(function (char) {
        freq[char] = (freq[char] || 0) + 1;
    });
    console.log('Частота символов:', freq);
    fs.writeFileSync(outputPath, result, { encoding: 'utf8' });
    var endTime = Date.now();
    console.log("\u041C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 (".concat(mode, "): ").concat(endTime - startTime, " \u043C\u0441"));
}
