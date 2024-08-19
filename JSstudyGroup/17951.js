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
  const arr = data.shift().split(' ').map(Number);
  const total = arr.reduce((a, b) => a + b);

  const calc = (target) => {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      if (sum >= target) {
        count += 1;
        sum = 0;
      }
    }
    if (count >= K) return true;
    return false;
  };

  let left = 0;
  let right = total;
  while (left <= right) {
    const midValue = Math.floor((left + right) / 2);
    const result = calc(midValue);
    if (result) left = midValue + 1;
    if (!result) right = midValue - 1;
  }

  console.log(right);

  process.exit();
});
