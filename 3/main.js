"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var num1 = parseFloat(readlineSync.question('Enter value for num1: '));
var num2 = parseFloat(readlineSync.question('Enter value for num2: '));
var num3 = parseFloat(readlineSync.question('Enter value for num3: '));
console.log("Entered values: num1 = ".concat(num1, ", num2 = ").concat(num2, ", num3 = ").concat(num3));
function greatestCommonDivisor(num1, num2, num3) {
    if (num3) {
        return greatestCommonDivisorTwoNums(greatestCommonDivisorTwoNums(num1, num2), greatestCommonDivisorTwoNums(num2, num3));
    }
    else {
        return greatestCommonDivisorTwoNums(num1, num2);
    }
}
function greatestCommonDivisorTwoNums(num1, num2) {
    var _a;
    var remainder;
    while (true) {
        if (num1 > num2) {
            _a = [num2, num1], num1 = _a[0], num2 = _a[1];
        }
        remainder = num2 % num1;
        if (remainder === 0) {
            return num1;
        }
        num2 = remainder;
    }
}
function IsPrime(num) {
    if (num <= 1)
        return false;
    for (var i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}
function primeRange(borderStart, borderEnd) {
    var primeNumbers = [];
    for (; borderStart <= borderEnd; borderStart++) {
        if (IsPrime(borderStart)) {
            primeNumbers.push(borderStart);
        }
    }
    return primeNumbers;
}
function greatestCommonDivisorTwoNumsF(num1, num2) {
    if (num2 === 0)
        return num1;
    return greatestCommonDivisorTwoNumsF(num2, num1 % num2);
}
console.log(greatestCommonDivisor(num1, num2));
console.log(greatestCommonDivisor(num1, num2, num3));
console.log(IsPrime(10));
console.log(IsPrime(7));
console.log(IsPrime(777));
console.log(IsPrime(101));
var primeNumbers = [];
primeNumbers = primeRange(2, 433);
var n = primeNumbers.length;
console.log(primeNumbers);
console.log(n, n / Math.log(n));
primeNumbers = primeRange(399, 443);
n = primeNumbers.length;
console.log(primeNumbers);
console.log(n, n / Math.log(n)); //мессены проверить диапозон что числа мессены являются простыми
function mersenNumbers(borderStart, borderEnd) {
    var mersenNums = [];
    for (; borderStart <= borderEnd; borderStart++) {
        mersenNums.push(Math.pow(2, borderStart) - 1);
        console.log(mersenNums[-1]);
    }
    console.log("-------------END--------------");
    return mersenNums;
}
function testMersenNums(mersenNums) {
    var mersenAndPrime = [];
    for (var x = 0; x <= mersenNums.length; x++) {
        if (IsPrime(mersenNums[x])) {
            console.log(mersenNums[x], " IsPrime");
            mersenAndPrime.push(mersenNums[x]);
        }
        else {
            console.log(mersenNums[x], " NotPrime");
        }
    }
    return mersenAndPrime;
}
printMersen(1, 10000);
function printMersen(borderStart, borderEnd) {
    for (; borderStart <= borderEnd; borderStart++) {
        if (IsPrime(borderStart)) {
            console.log("2^".concat(borderStart, "-1"));
        }
    }
}
