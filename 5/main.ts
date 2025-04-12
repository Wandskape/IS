import {multiplePermutationCipher} from "./multiplePermutationCipher";
import {snakeRouteCipher} from "./snakeRouteCipher";

snakeRouteCipher('./texts/ger.txt', './texts/snakeRouteCipher/enc.txt', 'encrypt');
snakeRouteCipher('./texts/snakeRouteCipher/enc.txt', './texts/snakeRouteCipher/dec.txt', 'decrypt');

//multiplePermutationCipher('./texts/ger2.txt', './texts/multiplePermutationCipher/enc.txt', 'encrypt', 'arsen', 'kolomeichuk');
//multiplePermutationCipher('./texts/multiplePermutationCipher/enc.txt', './texts/multiplePermutationCipher/dec.txt', 'decrypt', 'arsen', 'kolomeichuk');
