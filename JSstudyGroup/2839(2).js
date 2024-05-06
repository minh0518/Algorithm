const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const target = +data.shift();
  const DP = new Array(5001).fill(0); // 모두 0

  DP[3] = 1;
  DP[5] = 1;

  for (let i = 6; i <= target; i++) {
    // 3의 배수라면 이전 3의 배수에서 +1
    if (DP[i - 3]) DP[i] = DP[i - 3] + 1;

    // 3의 배수라면 이전 3의 배수에서 +1
    // 그렇지만, 3과5의 최소공배수라면 이미 DP[i]가 채워져 있게 되므로
    // 이 경우에는 둘 중 최솟값을 사용한다
    if (DP[i - 5]) DP[i] = DP[i] ? Math.min(DP[i], DP[i - 5] + 1) : DP[i - 5] + 1;
  }

  console.log(DP[target] === 0 ? -1 : DP[target]);

  process.exit();
});
