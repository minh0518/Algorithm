const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, K] = data.shift().split(' ').map(Number);
  const info = data.map((i) => i.split(' ').map(Number));
  info.unshift([0, 0]); // 무게, 비용

  const dp = new Array(N + 1).fill(undefined).map(() => new Array(K + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= K; j++) {
      const [weight, value] = info[i];
      if (weight > j) {
        dp[i][j] = dp[i - 1][j];
      } else if (weight <= j) {
        dp[i][j] = Math.max(dp[i - 1][j], value + dp[i - 1][j - weight]);
      }
    }
  }

  console.log(dp[N][K]);
  process.exit();
});
