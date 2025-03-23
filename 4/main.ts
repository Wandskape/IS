import {ruAlphabet, enAlphabet, binAlphabet, frAlphabet} from "./alphabets"
import {VigenerCipher, stringEncryption, stringDecryption} from "./VigenerCipher"
import {caesarModified} from "./firstTask"
import {trisemusCipher} from "./secondTask"
import {VigenerDecryptor} from "./VigenerDecryptor"

interface AssociativeArray {
    [key: symbol]: number
}

export {AssociativeArray}

// for(let i:number = 0;i<enAlphabet.length;i++){
//     console.log(enAlphabet.charCodeAt(i))
// }

//VigenerCipher(32, 1072, "жезл", './texts/originalText/ru.txt', './texts/encryptedText/ruEnc.txt')
//VigenerCipher(26, 97, "alfi", './texts/originalText/en.txt', './texts/encryptedText/enEnc.txt')
//VigenerCipher(26, 97, "alfi", './texts/encryptedText/enEnc.txt', './texts/decryptedText/enDec.txt')
//VigenerCipher(32, 1072, "жезл", './texts/encryptedText/ruEnc.txt', './texts/decryptedText/ruDec.txt')
// const { encryptedText, newKeyIndex } = stringEncryption("спасибо что скачали книгу в бесплатной электронной библиотеке ", "жезл", 0, 1072, 32)
// console.log(encryptedText)
//
// console.log(stringDecryption(encryptedText, "жезл", 0, 1072, 32))

//caesarModified('./texts/task1/ger.txt', './texts/task1/gerEnc.txt', 7, 26, 97, true)
//console.log("encryptedText")
//caesarModified('./texts/task1/gerEnc.txt', './texts/task1/gerDec.txt', 7, 26, 97, false)

//trisemusCipher('./texts/task2/ger.txt', './texts/task2/gerEnc.txt', true)

// let charArray: AssociativeArray = {}

//charArray = caesarModified('./texts/task1/ger.txt', './texts/task1/gerEnc.txt', 7, 26, 97, true)
//setTimeout(() => {  console.log(charArray); }, 1000);

// const result = measureExecutionTime(() => caesarModified('./texts/task1/ger.txt', './texts/task1/gerEnc.txt', 7, 26, 97, true));
// console.log(`Результат выполнения функции: ${result}`);
//
// function measureExecutionTime<T>(func: () => T): T {
//     const startTime = performance.now();
//     const result = func(); // Выполнение функции и сохранение результата
//     const endTime = performance.now();
//     const elapsedTime = endTime - startTime;
//     console.log(`Время выполнения: ${elapsedTime} миллисекунд`);
//     return result; // Возврат результата
// }

//VigenerDecryptor('./texts/encryptedText/enEnc.txt', './texts/decipheredText/en.txt');
VigenerDecryptor('./texts/encryptedText/enEnc.txt', './texts/decipheredText/en.txt');

