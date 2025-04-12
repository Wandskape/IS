"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var snakeRouteCipher_1 = require("./snakeRouteCipher");
(0, snakeRouteCipher_1.snakeRouteCipher)('./texts/ger.txt', './texts/snakeRouteCipher/enc.txt', 'encrypt');
(0, snakeRouteCipher_1.snakeRouteCipher)('./texts/snakeRouteCipher/enc.txt', './texts/snakeRouteCipher/dec.txt', 'decrypt');
//multiplePermutationCipher('./texts/ger2.txt', './texts/multiplePermutationCipher/enc.txt', 'encrypt', 'arsen', 'kolomeichuk');
//multiplePermutationCipher('./texts/multiplePermutationCipher/enc.txt', './texts/multiplePermutationCipher/dec.txt', 'decrypt', 'arsen', 'kolomeichuk');
