const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const first = data.shift().split('');
  const second = data.shift().split('');

  first.unshift('');
  second.unshift('');

  const maxLength = Math.max(first.length, second.length);
  const dp = new Array(maxLength + 1).fill(undefined).map(() => new Array(maxLength + 1).fill(0));

  for (let i = 1; i < maxLength; i++) {
    if (i >= first.length) continue;
    const firstStrValue = first[i];
    for (let j = 1; j < maxLength; j++) {
      if (j >= second.length) continue;
      const secondStrValue = second[j];

      if (firstStrValue === secondStrValue) dp[i][j] = dp[i - 1][j - 1] + 1;
    }
  }

  console.log(Math.max(...dp.map((row) => Math.max(...row))));

  process.exit();
});
