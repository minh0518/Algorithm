const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();

  const dp = new Array(N + 1).fill(0);
  dp[2] = 3;

  for (let i = 4; i <= N; i += 2) {
    dp[i] += dp[i - 2] * dp[2];
    for (let j = i - 4; j > 0; j -= 2) {
      dp[i] += dp[j] * 2;
    }
    dp[i] += 2;
  }

  console.log(dp[N]);

  process.exit();
});
