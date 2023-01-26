const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [n, m] = data.shift().split(' ').map(Number);

  let board = new Array(n + 1).fill().map(() => new Array(m + 1).fill(0));

  board[1][0] = BigInt(1);
  board[1][1] = BigInt(1);
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        board[i][j] = BigInt(1);
        continue;
      }
      board[i][j] = board[i - 1][j - 1] + board[i - 1][j];
    }
  }

  // BigInt로 사용했기 때문에 마지막 n을 지워야 함 >> String타입
  console.log(String(board[n][m]));

  process.exit();
});
