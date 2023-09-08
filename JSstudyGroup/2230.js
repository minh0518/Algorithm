const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M] = data.shift().split(' ').map(Number);
  const numbers = data.map(Number).sort((a, b) => a - b);

  let left = 0;
  let right = 1;

  let result = Infinity;
  while (left <= right && right !== N) {
    const gap = Math.abs(numbers[left] - numbers[right]);
    if (gap >= M) {
      if (result > gap) result = gap; // 최솟값 갱신
      left += 1;
    }
    if (gap < M) {
      right += 1;
    }
  }

  console.log(result);

  process.exit();
});
