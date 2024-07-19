const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const lowerBound = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = arr[mid];

      if (midValue < target) {
        left = mid + 1;
      }
      if (midValue >= target) {
        right = mid - 1;
      }
    }

    return left;
  };

  const LIS = (arr) => {
    const dp = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
      const value = arr[i];
      if (dp.at(-1) < value) {
        dp.push(value);
        continue;
      }

      const index = lowerBound(dp, value);
      dp[index] = value;
    }

    return dp.length;
  };

  let index = 0;
  const result = [];
  while (index < data.length) {
    const N = data[index];
    const info = data[index + 1].trim().split(/\s+/g).map(Number);

    result.push(LIS(info));

    index += 2;
  }

  console.log(result.join('\n'));

  process.exit();
});
