import * as fs from 'fs';

function snakeRouteCipher(inputPath: string, outputPath: string, mode: 'encrypt' | 'decrypt'): void {
    const startTime = Date.now();
    const text = fs.readFileSync(inputPath, { encoding: 'utf8' })
        .replace(/\s/g, '')
        .toLowerCase();

    const COLS = 10;
    const ROWS = Math.ceil(text.length / COLS);
    let result = '';

    if (mode === 'encrypt') {
        const table: string[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(' '));
        let index = 0;

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (index < text.length) {
                    const col = i % 2 === 0 ? j : COLS - 1 - j;
                    table[i][col] = text[index++];
                }
            }
        }

        result = table.flat().join('');
    } else if (mode === 'decrypt') {
        const table: string[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(' '));
        let index = 0;

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                const col = i % 2 === 0 ? j : COLS - 1 - j;
                if (index < text.length) {
                    table[i][col] = text[index++];
                }
            }
        }

        for (let j = 0; j < COLS; j++) {
            for (let i = 0; i < ROWS; i++) {
                if (table[i][j] !== ' ') {
                    result += table[i][j];
                }
            }
        }
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
    console.log(`Частота символов:`, freqString);
    console.log(`Маршрутная перестановка (${mode}): ${endTime - startTime} мс`);
}

export { snakeRouteCipher };
