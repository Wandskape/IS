"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multiplePermutationCipher_1 = require("./multiplePermutationCipher");
//snakeRouteCipher('./texts/ger.txt', './texts/snakeRouteCipher/enc.txt', 'encrypt');
//snakeRouteCipher('./texts/snakeRouteCipher/enc.txt', './texts/snakeRouteCipher/dec.txt', 'decrypt');
(0, multiplePermutationCipher_1.multiplePermutationCipher)('./texts/ger2.txt', './texts/multiplePermutationCipher/enc.txt', 'encrypt', 'arsen', 'kolomeichuk');
(0, multiplePermutationCipher_1.multiplePermutationCipher)('./texts/multiplePermutationCipher/enc.txt', './texts/multiplePermutationCipher/dec.txt', 'decrypt', 'arsen', 'kolomeichuk');
