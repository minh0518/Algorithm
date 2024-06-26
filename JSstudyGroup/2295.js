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
  const arr = data.map(Number).sort((a, b) => a - b);

  const search = (AXB, target) => {
    let left = 0;
    let right = AXB.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = AXB[mid];

      if (midValue > target) {
        right = mid - 1;
      }
      if (midValue < target) {
        left = mid + 1;
      }
      if (midValue === target) {
        return true;
      }
    }
    return false;
  };

  // A + B + C = D

  const AXB = [];

  // 중복 포함이므로 둘 다 0부터 시작
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      AXB.push(arr[i] + arr[j]);
    }
  }
  AXB.sort((a, b) => a - b);

  const result = [];

  // C,D를 구한 뒤, D-C의 값을 AXB에서 이분탐색 진행
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      // A+B+C=D 에서, D는 C보다 클 수밖에 없으므로 i+1부터
      const C = arr[i];
      const D = arr[j]; // 더 큰 값이 D
      if (search(AXB, D - C)) result.push(D);
    }
  }
  console.log(Math.max(...result));

  process.exit();
});
