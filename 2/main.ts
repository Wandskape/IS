import {ruAlphabet, enAlphabet, binAlphabet, frAlphabet} from "./alphabets"
import {symbolCount} from "./readFiles"

interface AssociativeArray {
    [key: symbol]: number
}

//ru
let ruCharsArray: AssociativeArray = {}

for(const char of ruAlphabet){
    ruCharsArray[char] = 0
}

const ruFilePath:string = './texts/ru.txt';

ruCharsArray = symbolCount(ruCharsArray, ruAlphabet, ruFilePath)

console.log(`Энтропия русского языка: ${entropy(ruCharsArray)}`)

//en
let enCharsArray: AssociativeArray = {}

for(const char of enAlphabet){
    enCharsArray[char] = 0
}

const enFilePath:string = './texts/en.txt'

enCharsArray = symbolCount(enCharsArray, enAlphabet, enFilePath)
console.log(`Энтропия английского языка: ${entropy(enCharsArray)}`)

//fr
let frCharsArray: AssociativeArray = {}

for(const char of enAlphabet){
    frCharsArray[char] = 0
}

const frFilePath:string = './texts/fr.txt'

frCharsArray = symbolCount(frCharsArray, enAlphabet, enFilePath)
console.log(`Энтропия французского языка: ${entropy(frCharsArray)}`)

//bin
let binCharsArray: AssociativeArray = {}

for(const char of binAlphabet){
    binCharsArray[char] = 0
}

const binFilePath:string = './texts/bin.txt'

binCharsArray = symbolCount(binCharsArray, binAlphabet, binFilePath)
console.log(`Энтропия бинарного языка: ${entropy(binCharsArray)}`)

function amountOfInformation(message:string, alphabetEntropy):number{
    return alphabetEntropy * message.length;
}

const message:string = 'коломейчукарсенийалексеевич'
console.log(`Количество информации в сообщении на русском языке: ${message}, ровна ${amountOfInformation(message, entropy(ruCharsArray))}`)
console.log(`Количество информации в сообщении в кодах ASCII: ${message}, ровна ${message.length * 8}`)

function entropyWithIssue(entropy:number, probability: number):number{
    entropy += probability * Math.log2(probability) + (1 - probability) * Math.log2(1 - probability)
    console.log(`EntropyERROR: ${entropy}`)
    return entropy
}

console.log("Вероятность ошибки 0.1")
console.log(`Количество информации в сообщении на русском языке: ${message}, ровна ${amountOfInformation(message, entropyWithIssue(entropy(ruCharsArray), 0.1))}`)
console.log(`Количество информации в сообщении в кодах ASCII: ${message}, ровна ${message.length * entropyWithIssue(8, 0.1)}`)

console.log("Вероятность ошибки 0.5")
console.log(`Количество информации в сообщении на русском языке: ${message}, ровна ${amountOfInformation(message, entropyWithIssue(entropy(ruCharsArray), 0.5))}`)
console.log(`Количество информации в сообщении в кодах ASCII: ${message}, ровна ${message.length * entropyWithIssue(8, 0.5)}`)

console.log("Вероятность ошибки 1.0")
console.log(`Количество информации в сообщении на русском языке: ${message}, ровна ${amountOfInformation(message, entropyWithIssue(entropy(ruCharsArray), 1.0))}`)
console.log(`Количество информации в сообщении в кодах ASCII: ${message}, ровна ${message.length * entropyWithIssue(8, 1.0)}`)


function numOfCharsInText(CharsArray: AssociativeArray):number{
    let numberOfChars:number = 0
    for (const key in CharsArray) {
        numberOfChars += CharsArray[key]
        console.log(`Символ: ${key}, Количество: ${CharsArray[key]}`);
    }
    console.log(`Колличество символов в тексте: ${numberOfChars}`)
    return numberOfChars
}

function charProbability(CharsArray: AssociativeArray):AssociativeArray{
    let numberOfChars = numOfCharsInText(CharsArray)
    for (const key in CharsArray) {
        CharsArray[key] /= numberOfChars
        console.log(`Символ: ${key}, Вероятность: ${CharsArray[key]}`);
    }
    return CharsArray
}

function entropy(CharsArray: AssociativeArray):number{
    CharsArray = charProbability(CharsArray)
    let Entropy: number = 0
    for(const key in CharsArray){
        Entropy += CharsArray[key] * Math.log2(CharsArray[key])
    }
    return -Entropy
}


export {AssociativeArray}



