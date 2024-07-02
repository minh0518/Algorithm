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
  const dp = [arr[0]];

  const lowerBound = (target) => {
    let left = 0;
    let right = dp.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = dp[mid];

      if (midValue < target) {
        left = mid + 1;
      }
      if (midValue >= target) {
        right = mid - 1;
      }
    }
    return left;
  };

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    const lastValue = dp.at(-1);
    if (current > lastValue) dp.push(current);
    if (current <= lastValue) {
      const lowerBoundIndex = lowerBound(current);
      dp.splice(lowerBoundIndex, 1, current);
    }
  }

  console.log(dp.length);

  process.exit();
});
