const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const checkEnd = (playBoard) => {
    // 가로
    let rowIndex = 0;
    while (rowIndex !== 9) {
      const row = playBoard.slice(rowIndex, rowIndex + 3);
      if (row.every((i) => i === 'O') || row.every((i) => i === 'X')) return true;
      rowIndex += 3;
    }

    // 세로
    for (let i = 0; i < 3; i++) {
      const col = [];
      for (let j = 0; j < 3; j++) {
        col.push(playBoard[i + j * 3]);
      }
      if (col.every((i) => i === 'O') || col.every((i) => i === 'X')) return true;
    }

    // 대각선
    const bottomRight = [];
    const bottomLeft = [];
    bottomRight.push(playBoard[0], playBoard[4], playBoard[8]);
    bottomLeft.push(playBoard[2], playBoard[4], playBoard[6]);

    if (bottomRight.every((i) => i === 'O') || bottomRight.every((i) => i === 'X')) return true;
    if (bottomLeft.every((i) => i === 'O') || bottomLeft.every((i) => i === 'X')) return true;

    return false;
  };

  const allCases = [];
  const dfs = (current, playBoard) => {
    // 종료 조건 or 가득 찼을 때
    if (checkEnd(playBoard) || playBoard.every((i) => i !== '.')) {
      allCases.push(playBoard.join(''));
      return;
    }

    let next;
    current === 'O' ? (next = 'X') : (next = 'O');

    for (let i = 0; i < 9; i++) {
      if (playBoard[i] !== '.') continue;
      playBoard[i] = current;
      dfs(next, playBoard);
      playBoard[i] = '.';
    }
  };

  const playBoard = new Array(9).fill('.');
  dfs('X', playBoard);

  const info = data.slice(0, data.length - 1);
  const result = [];
  for (let eachCase of info) {
    if (allCases.includes(eachCase)) {
      result.push('valid');
    } else {
      result.push('invalid');
    }
  }
  console.log(result.join('\n'));

  process.exit();
});
