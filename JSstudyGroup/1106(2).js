const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [C, N] = data.shift().split(' ').map(Number);
  const info = data.map((i) => i.split(' ').map(Number));

  // dp[i]: i명의 고객을 늘이기 위한 최소비용
  // i명의 고객을 인덱스로 사용하기 위해 크기는 (C+99)에서 +1
  const dp = new Array(C + 99 + 1).fill(Infinity);
  dp[0] = 0;

  for (let [price, people] of info) {
    for (let i = people; i < dp.length; i++) {
      dp[i] = Math.min(dp[i], dp[i - people] + price);
    }
  }

  console.log(Math.min(...dp.slice(C)));

  process.exit();
});
