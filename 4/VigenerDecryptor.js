"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VigenerDecryptor = VigenerDecryptor;
var fs = require("fs");
function VigenerDecryptor(encryptedTextPath, decryptedTextPath) {
    var ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
    var ALPHABET_LENGTH = ALPHABET.length;
    // Считываем зашифрованный текст
    var encryptedText = fs.readFileSync(encryptedTextPath, { encoding: 'utf8' }).replace(/\r?\n/g, '').toLowerCase();
    console.log('Начало дешифрования...');
    // Функция для анализа текста и оценки длины ключа
    function analyzeKeyLength(text, maxKeyLength) {
        var probableKeyLength = 1;
        var maxCoincidenceIndex = 0;
        var _loop_1 = function (keyLength_1) {
            var substrings = Array.from({ length: keyLength_1 }, function (_, i) { return text.split('').filter(function (_, index) { return index % keyLength_1 === i; }).join(''); });
            var coincidenceIndex = substrings.reduce(function (sum, substr) {
                var freq = substr.split('').reduce(function (acc, char) {
                    var _a;
                    return (__assign(__assign({}, acc), (_a = {}, _a[char] = (acc[char] || 0) + 1, _a)));
                }, {});
                var substrLength = substr.length;
                return sum + Object.values(freq).reduce(function (acc, f) { return acc + (f * (f - 1)) / (substrLength * (substrLength - 1)); }, 0);
            }, 0) / substrings.length;
            if (coincidenceIndex > maxCoincidenceIndex) {
                maxCoincidenceIndex = coincidenceIndex;
                probableKeyLength = keyLength_1;
            }
        };
        for (var keyLength_1 = 1; keyLength_1 <= maxKeyLength; keyLength_1++) {
            _loop_1(keyLength_1);
        }
        return probableKeyLength;
    }
    // Вспомогательная функция для нахождения ключа
    function findKey(text, keyLength) {
        var key = '';
        var _loop_2 = function (i) {
            var substring = text.split('').filter(function (_, index) { return index % keyLength === i; }).join('');
            var freq = substring.split('').reduce(function (acc, char) {
                var _a;
                return (__assign(__assign({}, acc), (_a = {}, _a[char] = (acc[char] || 0) + 1, _a)));
            }, {});
            var mostFrequentChar = Object.entries(freq).reduce(function (a, b) { return (b[1] > a[1] ? b : a); })[0];
            var keyChar = String.fromCharCode(((mostFrequentChar.charCodeAt(0) - 'e'.charCodeAt(0) + ALPHABET_LENGTH) % ALPHABET_LENGTH) + 'a'.charCodeAt(0));
            key += keyChar;
        };
        for (var i = 0; i < keyLength; i++) {
            _loop_2(i);
        }
        // Удаляем повторяющуюся часть ключа
        for (var length_1 = 1; length_1 <= key.length; length_1++) {
            var candidate = key.slice(0, length_1);
            if (candidate.repeat(Math.ceil(key.length / length_1)).startsWith(key)) {
                return candidate;
            }
        }
        return key; // Если повторений не найдено, возвращаем весь ключ
    }
    // Функция для расшифровки текста
    function decrypt(text, key) {
        var decryptedText = '';
        for (var i = 0; i < text.length; i++) {
            var charCode = (text.charCodeAt(i) - key.charCodeAt(i % key.length) + ALPHABET_LENGTH) % ALPHABET_LENGTH;
            decryptedText += String.fromCharCode(charCode + 'a'.charCodeAt(0));
        }
        return decryptedText;
    }
    // Анализируем длину ключа
    var keyLength = analyzeKeyLength(encryptedText, 20); // Предполагаем максимальную длину ключа 20
    var key = findKey(encryptedText, keyLength);
    console.log("\u041D\u0430\u0439\u0434\u0435\u043D \u043A\u043B\u044E\u0447: ".concat(key));
    // Расшифровываем текст
    var decryptedText = decrypt(encryptedText, key);
    // Сохраняем расшифрованный текст
    fs.writeFileSync(decryptedTextPath, decryptedText, { encoding: 'utf8' });
    console.log('Расшифровка завершена.');
}
