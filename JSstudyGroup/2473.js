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

  // 3번째 값으로 사용할 변수
  let third = 0;

  let result;
  let minValue = Infinity;

  // third이후 최소 2칸은 더 사용해야 한다.
  while (third < arr.length - 2) {
    // third뒤로 투포인터 진행
    let left = third + 1;
    let right = arr.length - 1;

    while (left < right) {
      const value = arr[third] + arr[left] + arr[right];
      if (minValue > Math.abs(value)) {
        result = [arr[third], arr[left], arr[right]];
        minValue = Math.abs(value);
      }

      if (value < 0) {
        left += 1;
      }
      if (value > 0) {
        right -= 1;
      }
      if (value === 0) {
        result = [arr[third], arr[left], arr[right]];
        third = arr.length - 2;
        break;
      }
    }

    third += 1;
  }
  console.log(result.join(' '));

  process.exit();
});
