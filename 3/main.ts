import * as readlineSync from 'readline-sync'

let num1: number = parseFloat(readlineSync.question('Enter value for num1: '))
let num2: number = parseFloat(readlineSync.question('Enter value for num2: '))
let num3: number = parseFloat(readlineSync.question('Enter value for num3: '))

console.log(`Entered values: num1 = ${num1}, num2 = ${num2}, num3 = ${num3}`)

function greatestCommonDivisor(num1:number, num2:number, num3?:number):number{
    if(num3){
        return greatestCommonDivisorTwoNums(greatestCommonDivisorTwoNums(num1, num2), greatestCommonDivisorTwoNums(num2, num3))
    }
    else{
        return greatestCommonDivisorTwoNums(num1, num2)
    }
}

function greatestCommonDivisorTwoNums(num1:number, num2:number):number{
    let remainder:number
    while (true) {
        if (num1 > num2) {
            [num1, num2] = [num2, num1];
        }
        remainder = num2 % num1;
        if (remainder === 0) {
            return num1;
        }
        num2 = remainder;
    }
}

function IsPrime(num: number): boolean {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function primeRange(borderStart:number, borderEnd:number):number[]{
    let primeNumbers:number[] = []
    for(; borderStart<=borderEnd;borderStart++){
        if(IsPrime(borderStart)){
            primeNumbers.push(borderStart)
        }
    }
    return primeNumbers
}

function greatestCommonDivisorTwoNumsF(num1:number, num2:number):number{
    if(num2 === 0)
        return num1
    return greatestCommonDivisorTwoNumsF(num2, num1%num2)
}

console.log(greatestCommonDivisor(num1,num2))
console.log(greatestCommonDivisor(num1,num2, num3))
console.log(IsPrime(10))
console.log(IsPrime(7))
console.log(IsPrime(777))
console.log(IsPrime(101))

let primeNumbers:number[] = []
primeNumbers = primeRange(2,433)
let n:number = primeNumbers.length
console.log(primeNumbers)
console.log(n, n/Math.log(n))

primeNumbers = primeRange(399,443)
n = primeNumbers.length
console.log(primeNumbers)
console.log(n, n/Math.log(n))



