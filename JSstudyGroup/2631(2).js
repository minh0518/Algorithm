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
  const children = data.map(Number);
  const dp = new Array(N).fill(1);

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (children[i] > children[j]) {
        if (dp[i] < dp[j] + 1) dp[i] = dp[j] + 1;
      }
    }
  }
  console.log(N - Math.max(...dp));

  process.exit();
});
