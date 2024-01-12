// 24.1.12

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

  const binarySearch = (index, target) => {
    const targetArr = [...arr];
    targetArr.splice(index, 1); // target은 탐색 배열에서 제거

    let start = 0;
    let end = targetArr.length - 1;

    // 문제에서 다른 두수의 합을 찾는 것이므로 같아도 안된다
    while (start < end) {
      const sum = targetArr[start] + targetArr[end];

      if (sum === target) {
        return true;
      }

      if (sum > target) {
        end -= 1;
      }
      if (sum < target) {
        start += 1;
      }
    }
    return false;
  };

  let count = 0;

  for (let i = 0; i < N; i++) {
    if (binarySearch(i, arr[i])) {
      count += 1;
    }
  }

  console.log(count);

  process.exit();
});
