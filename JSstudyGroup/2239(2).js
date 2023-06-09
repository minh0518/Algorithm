const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let board = data.map((i) => i.split('').map(Number));

  let zeroLocation = [];
  board.forEach((i, iIndex) => {
    i.forEach((j, jIndex) => {
      if (j === 0) zeroLocation.push([iIndex, jIndex]);
    });
  });

  const getPossibleNum = (x, y) => {
    let existNum = [];
    let startRow = Math.floor(x / 3) * 3;
    let startCol = Math.floor(y / 3) * 3;

    // 3x3 영역
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        existNum.push(board[i][j]);
      }
    }

    // 가로
    existNum.push(...board[x]);

    // 세로
    for (let i = 0; i < 9; i++) {
      existNum.push(board[i][y]);
    }

    return new Array(9)
      .fill()
      .map((_, index) => index + 1)
      .filter((i) => {
        return !existNum.includes(i);
      });
  };

  let result;
  const dfs = (index, current) => {
    if (index === zeroLocation.length) {
      result = current;
      return true;
    }

    let [x, y] = zeroLocation[index];
    let restNum = getPossibleNum(x, y);

    if (restNum.length) {
      for (let num of restNum) {
        current[x][y] = num; // 해당 좌표에 대해 가능한 모든 숫자들을 넣고
        // 재귀를 호출해서 탐색
        if (dfs(index + 1, current)) return true;
      }
      // 해당 좌표에 가능한 모든 숫자를 넣어보고 되돌아왔다면 그 자리에 0을 넣고
      // 재귀 탈출 (이전 재귀에서 (이전 0좌표에)다른 값을 넣고 다시 여기로 재귀 호출할 예정)
      current[x][y] = 0;
      return false;
    }
  };

  dfs(0, board);
  console.log(result.map((i) => i.join('')).join('\n'));

  process.exit();
});
