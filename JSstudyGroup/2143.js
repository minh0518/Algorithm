// 24.1.15
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const T = +data.shift();
  const N = +data.shift();
  const A = data.shift().split(' ').map(Number);
  const M = +data.shift();
  const B = data.shift().split(' ').map(Number);

  const binarySearch = (targetArr, targetNum) => {
    let left = 0;
    let right = targetArr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const currentValue = targetArr[mid];

      if (currentValue < targetNum) {
        left = mid + 1;
      }
      if (currentValue >= targetNum) {
        right = mid - 1;
      }
    }

    return left;
  };

  // A 부배열의 합
  const aSum = [];
  for (let i = 1; i <= N; i++) {
    for (let j = 0; j <= N - i; j++) {
      aSum.push(A.slice(j, j + i).reduce((a, b) => a + b, 0));
    }
  }
  aSum.sort((a, b) => a - b);

  // B 부배열의 합
  const bSum = [];
  for (let i = 1; i <= M; i++) {
    for (let j = 0; j <= M - i; j++) {
      bSum.push(B.slice(j, j + i).reduce((a, b) => a + b, 0));
    }
  }

  // A 부배열의 각 결과들의 갯수 파악
  // ex) 1이 3개, 2가 2개, ...
  const aInfo = new Map();
  for (let i of aSum) {
    aInfo.set(i, aInfo.has(i) ? aInfo.get(i) + 1 : 1);
  }

  let result = 0;

  for (let i of bSum) {
    const target = T - i;
    const index = binarySearch(aSum, target);
    if (index < aSum.length && aSum[index] === target) {
      // A의 부배열에 존재하는 갯수만큼 더해야 함 (모든 경우를 찾아야 하므로)
      result += aInfo.get(target);
    }
  }

  console.log(result);

  process.exit();
});
