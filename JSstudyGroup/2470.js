// 24.2.6
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
  const arr = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);
  // -99 -2 -1 4 98

  let left = 0;
  let right = arr.length - 1;
  let minValue = Infinity;

  let result = [];
  while (left < right) {
    const currentValue = arr[left] + arr[right];

    // 최솟값 갱신
    if (Math.abs(minValue) >= Math.abs(currentValue)) {
      result = [arr[left], arr[right]];
      minValue = currentValue;
    }

    if (currentValue === 0) break;

    // 양수라면 양수값 줄이기
    if (currentValue > 0) {
      right -= 1;
    }
    // 음수라면 음수값 줄이기
    if (currentValue < 0) {
      left += 1;
    }
  }

  console.log(result.join(' '));

  process.exit();
});
