const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [M, N] = data.shift().split(' ').map(Number);
  const board = data.map((i) => i.split(' ').map(Number));

  const dp = new Array(M + 1).fill(undefined).map(() => new Array(N + 1).fill(0));

  for (let i = 1; i <= M; i++) {
    for (let j = 1; j <= N; j++) {
      if (board[i - 1][j - 1] !== 0) continue;
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }

  console.log(Math.max(...dp.map((row) => Math.max(...row))));

  process.exit();
});
