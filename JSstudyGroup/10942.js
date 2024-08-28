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
  const arr = data.shift().split(' ').map(Number);
  const M = +data.shift();
  const questions = data.map((i) => i.split(' ').map(Number));

  const dp = new Array(N).fill(undefined).map(() => new Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
    if (i !== N - 1 && arr[i] === arr[i + 1]) {
      dp[i][i + 1] = 1;
    }
  }

  for (let gap = 2; gap <= N - 1; gap++) {
    for (let from = 0; from < N - gap; from++) {
      const to = from + gap;
      if (arr[from] === arr[to] && dp[from + 1][to - 1]) dp[from][to] = 1;
    }
  }

  const result = [];
  for (let [from, to] of questions) {
    result.push(dp[from - 1][to - 1]);
  }
  console.log(result.join('\n'));

  process.exit();
});
