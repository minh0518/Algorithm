const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [n, k] = data.shift().split(' ').map(Number);

  const info = data.map(Number);
  info.sort((a, b) => a - b);

  const dp = new Array(k + 1).fill(Infinity);

  // 각 동전의 첫번째 배수값을 채우기 위해
  dp[0] = 0;

  for (const coin of info) {
    for (let i = coin; i <= k; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  console.log(dp[k] === Infinity ? -1 : dp[k]);

  process.exit();
});
