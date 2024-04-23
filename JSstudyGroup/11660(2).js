const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M] = data.shift().split(' ').map(Number);
  const board = data.slice(0, N).map((i) => i.split(' ').map(Number));
  const info = data.slice(N).map((i) => i.split(' ').map(Number));

  const DP = new Array(N + 1).fill(undefined).map(() => new Array(N + 1).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const originValue = board[i][j];
      DP[i + 1][j + 1] = DP[i][j + 1] + DP[i + 1][j] + originValue - DP[i][j];
    }
  }

  const result = [];
  for (let row of info) {
    const [startX, startY, endX, endY] = row;
    result.push(DP[endX][endY] - DP[endX][startY - 1] - DP[startX - 1][endY] + DP[startX - 1][startY - 1]);
  }

  console.log(result.join('\n'));
  process.exit();
});
