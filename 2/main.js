"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alphabets_1 = require("./alphabets");
var readFiles_1 = require("./readFiles");
//ru
var ruCharsArray = {};
for (var _i = 0, ruAlphabet_1 = alphabets_1.ruAlphabet; _i < ruAlphabet_1.length; _i++) {
    var char = ruAlphabet_1[_i];
    ruCharsArray[char] = 0;
}
var ruFilePath = './texts/ru.txt';
ruCharsArray = (0, readFiles_1.symbolCount)(ruCharsArray, alphabets_1.ruAlphabet, ruFilePath);
console.log("\u042D\u043D\u0442\u0440\u043E\u043F\u0438\u044F \u0440\u0443\u0441\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430: ".concat(entropy(ruCharsArray)));
//en
var enCharsArray = {};
for (var _a = 0, enAlphabet_1 = alphabets_1.enAlphabet; _a < enAlphabet_1.length; _a++) {
    var char = enAlphabet_1[_a];
    enCharsArray[char] = 0;
}
var enFilePath = './texts/en.txt';
enCharsArray = (0, readFiles_1.symbolCount)(enCharsArray, alphabets_1.enAlphabet, enFilePath);
console.log("\u042D\u043D\u0442\u0440\u043E\u043F\u0438\u044F \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430: ".concat(entropy(enCharsArray)));
//fr
var frCharsArray = {};
for (var _b = 0, enAlphabet_2 = alphabets_1.enAlphabet; _b < enAlphabet_2.length; _b++) {
    var char = enAlphabet_2[_b];
    frCharsArray[char] = 0;
}
var frFilePath = './texts/fr.txt';
frCharsArray = (0, readFiles_1.symbolCount)(frCharsArray, alphabets_1.enAlphabet, enFilePath);
console.log("\u042D\u043D\u0442\u0440\u043E\u043F\u0438\u044F \u0444\u0440\u0430\u043D\u0446\u0443\u0437\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430: ".concat(entropy(frCharsArray)));
//bin
var binCharsArray = {};
for (var _c = 0, binAlphabet_1 = alphabets_1.binAlphabet; _c < binAlphabet_1.length; _c++) {
    var char = binAlphabet_1[_c];
    binCharsArray[char] = 0;
}
var binFilePath = './texts/bin.txt';
binCharsArray = (0, readFiles_1.symbolCount)(binCharsArray, alphabets_1.binAlphabet, binFilePath);
console.log("\u042D\u043D\u0442\u0440\u043E\u043F\u0438\u044F \u0431\u0438\u043D\u0430\u0440\u043D\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430: ".concat(entropy(binCharsArray)));
function amountOfInformation(message, alphabetEntropy) {
    return alphabetEntropy * message.length;
}
var message = 'коломейчукарсенийалексеевич';
console.log("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435: ".concat(message, ", \u0440\u043E\u0432\u043D\u0430 ").concat(amountOfInformation(message, entropy(ruCharsArray))));
console.log("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u0432 \u043A\u043E\u0434\u0430\u0445 ASCII: ".concat(message, ", \u0440\u043E\u0432\u043D\u0430 ").concat(message.length * 8));
function entropyWithIssue(entropy, probability) {
    entropy += probability * Math.log2(probability) + (1 - probability) * Math.log2(1 - probability);
    console.log("EntropyERROR: ".concat(entropy));
    return entropy;
}
console.log("Вероятность ошибки 0.1");
console.log("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435: ".concat(message, ", \u0440\u043E\u0432\u043D\u0430 ").concat(amountOfInformation(message, entropyWithIssue(entropy(ruCharsArray), 0.1))));
console.log("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u0432 \u043A\u043E\u0434\u0430\u0445 ASCII: ".concat(message, ", \u0440\u043E\u0432\u043D\u0430 ").concat(message.length * entropyWithIssue(8, 0.1)));
console.log("Вероятность ошибки 0.5");
console.log("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435: ".concat(message, ", \u0440\u043E\u0432\u043D\u0430 ").concat(amountOfInformation(message, entropyWithIssue(entropy(ruCharsArray), 0.5))));
console.log("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u0432 \u043A\u043E\u0434\u0430\u0445 ASCII: ".concat(message, ", \u0440\u043E\u0432\u043D\u0430 ").concat(message.length * entropyWithIssue(8, 0.5)));
console.log("Вероятность ошибки 1.0");
console.log("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435: ".concat(message, ", \u0440\u043E\u0432\u043D\u0430 ").concat(amountOfInformation(message, entropyWithIssue(entropy(ruCharsArray), 1.0))));
console.log("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u0432 \u043A\u043E\u0434\u0430\u0445 ASCII: ".concat(message, ", \u0440\u043E\u0432\u043D\u0430 ").concat(message.length * entropyWithIssue(8, 1.0)));
function numOfCharsInText(CharsArray) {
    var numberOfChars = 0;
    for (var key in CharsArray) {
        numberOfChars += CharsArray[key];
        console.log("\u0421\u0438\u043C\u0432\u043E\u043B: ".concat(key, ", \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ").concat(CharsArray[key]));
    }
    console.log("\u041A\u043E\u043B\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u0432 \u0442\u0435\u043A\u0441\u0442\u0435: ".concat(numberOfChars));
    return numberOfChars;
}
function charProbability(CharsArray) {
    var numberOfChars = numOfCharsInText(CharsArray);
    for (var key in CharsArray) {
        CharsArray[key] /= numberOfChars;
        console.log("\u0421\u0438\u043C\u0432\u043E\u043B: ".concat(key, ", \u0412\u0435\u0440\u043E\u044F\u0442\u043D\u043E\u0441\u0442\u044C: ").concat(CharsArray[key]));
    }
    return CharsArray;
}
function entropy(CharsArray) {
    CharsArray = charProbability(CharsArray);
    var Entropy = 0;
    for (var key in CharsArray) {
        Entropy += CharsArray[key] * Math.log2(CharsArray[key]);
    }
    return -Entropy;
}
