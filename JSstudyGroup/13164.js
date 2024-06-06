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
  const info = data.shift().split(' ').map(Number);

  const gapInfo = [];

  for (let i = 0; i < info.length - 1; i++) {
    const current = info[i];
    const next = info[i + 1];
    gapInfo.push([i, i + 1, next - current]);
  }

  gapInfo.sort((a, b) => b[2] - a[2]);

  let result = 0;
  gapInfo.slice(K - 1).forEach((i) => {
    result += i[2];
  });
  console.log(result);

  process.exit();
});
