const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const board = data.map((i) => i.split(' ').map(Number));
  const wholeNunber = new Array(9).fill().map((_, index) => index + 1);

  const zeroIndexs = [];
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 0) zeroIndexs.push([rowIndex, colIndex]);
    });
  });

  const checkWidthHeight = (row, col) => {
    //row
    const rows = board[row];

    //col
    const cols = [];
    for (let i = 0; i < 9; i++) {
      cols.push(board[i][col]);
    }

    const total = [...rows, ...cols];
    const rest = wholeNunber.filter((i) => !total.includes(i));
    return rest;
  };

  // 0 3 6
  const checkAround = (row, col) => {
    const existNumbers = [];
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        existNumbers.push(board[i][j]);
      }
    }

    const rest = wholeNunber.filter((i) => !existNumbers.includes(i));
    return rest;
  };

  const dfs = (index) => {
    if (index === zeroIndexs.length) {
      return true;
    }

    const [zeroRow, zeroCol] = zeroIndexs[index];

    const restWidthHeight = checkWidthHeight(zeroRow, zeroCol);
    const restAround = checkAround(zeroRow, zeroCol);
    const rest = restWidthHeight.filter((i) => restAround.includes(i));
    if (!rest.length) return;

    for (let i of rest) {
      board[zeroRow][zeroCol] = i;
      if (dfs(index + 1)) return true;
      board[zeroRow][zeroCol] = 0;
    }
  };

  dfs(0);

  console.log(board.map((row) => row.join(' ')).join('\n'));

  process.exit();
});
