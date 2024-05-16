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

  const calc = (target, index) => {
    let start = 0;
    let end = N - 1;

    // 서로 다른 두수의 합을 찾는 것이므로 start와 end는 같아도 안된다
    while (start < end) {
      // target이 있는 index는 탐색 대상에서 제외
      if (start === index) {
        start += 1;
        continue;
      }
      if (end === index) {
        end -= 1;
        continue;
      }

      const sum = arr[start] + arr[end];

      if (sum < target) {
        start += 1;
      }
      if (sum > target) {
        end -= 1;
      }
      if (sum === target) {
        return true;
      }
    }
    return false;
  };

  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (calc(value, i)) count += 1;
  }

  console.log(count);

  process.exit();
});
