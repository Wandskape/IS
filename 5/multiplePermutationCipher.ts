import * as fs from 'fs';

function multiplePermutationCipher(inputPath: string, outputPath: string, mode: 'encrypt' | 'decrypt', rowKey: string, colKey: string): void {
    const startTime = Date.now();

    let text = fs.readFileSync(inputPath, { encoding: 'utf8' })
        .replace(/\s/g, '')
        .toLowerCase();

    const ROWS = rowKey.length;
    const COLS = colKey.length;
    const tableSize = ROWS * COLS;

    if (mode === 'encrypt') {
        while (text.length % tableSize !== 0) {
            text += '*';
        }
    }

    let result = '';

    const rowOrder = rowKey.split('').map((_, i) => i).sort((a, b) => rowKey[a].localeCompare(rowKey[b]));
    const colOrder = colKey.split('').map((_, i) => i).sort((a, b) => colKey[a].localeCompare(colKey[b]));

    if (mode === 'encrypt') {
        const table: string[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(' '));
        let index = 0;

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (index < text.length) {
                    table[i][j] = text[index++];
                }
            }
        }

        const permutedTable: string[][] = rowOrder.map((row) => colOrder.map((col) => table[row][col]));
        result = permutedTable.flat().join('');
    } else if (mode === 'decrypt') {
        const permutedTable: string[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(' '));
        let index = 0;

        for (let row of rowOrder) {
            for (let col of colOrder) {
                if (index < text.length) {
                    permutedTable[row][col] = text[index++];
                }
            }
        }

        result = permutedTable.map((row) => row.join('')).join('');
        result = result.replace(/\*+$/g, '');
    }

    const freq: Record<string, number> = {};
    result.split('').forEach((char) => {
        freq[char] = (freq[char] || 0) + 1;
    });

    const freqString = Object.entries(freq)
        .map(([char, count]) => `${char}: ${count}`)
        .join(', ');

    fs.writeFileSync(outputPath, result, { encoding: 'utf8' });
    const endTime = Date.now();
    console.log('Частота символов:', freqString);
    console.log(`Множественная перестановка (${mode}): ${endTime - startTime} мс`);
}

export { multiplePermutationCipher };
