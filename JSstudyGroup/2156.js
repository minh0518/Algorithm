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
  const arr = data.map(Number);

  const dp = new Array(N).fill(0);

  dp[0] = arr[0];
  dp[1] = arr[0] + arr[1];
  dp[2] = Math.max(arr[1] + arr[2], arr[0] + arr[2], arr[0] + arr[1]);

  for (let i = 3; i < N; i++) {
    dp[i] = Math.max(dp[i - 3] + arr[i - 1] + arr[i], dp[i - 2] + arr[i], dp[i - 1]);
  }
  console.log(dp[N - 1]);

  process.exit();
});
