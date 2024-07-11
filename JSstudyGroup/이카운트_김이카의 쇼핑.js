const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, L, R] = data.shift().split(' ').map(Number);
  const info = data.shift().split(' ').map(Number);
  const sumArr = new Array(N + 1).fill(0);

  for (let i = 0; i < N; i++) {
    sumArr[i + 1] = sumArr[i] + info[i];
  }

  let count = 0;

  const lowerBound = (arr, target, index) => {
    let left = index + 1;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = arr[mid];
      if (midValue >= target) {
        right = mid - 1;
      }
      if (midValue < target) {
        left = mid + 1;
      }
    }
    return left;
  };

  const upperBound = (arr, target, index) => {
    let left = index + 1;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = arr[mid];
      if (midValue > target) {
        right = mid - 1;
      }
      if (midValue <= target) {
        left = mid + 1;
      }
    }
    return left;
  };

  for (let i = 0; i < N; i++) {
    let minRange = sumArr[i] + L;
    let maxRange = sumArr[i] + R;

    // 이상의 값이 처음 나오는 위치를 구하기 위해 lowerBound를 사용
    let low = lowerBound(sumArr, minRange, i);
    // 이하의 값이 마지막으로 나오는 위치를 구하기 위해 upperBound에서 -1을 진행
    let high = upperBound(sumArr, maxRange, i) - 1;

    if (high >= low) {
      // 구간만큼 정답 개수를 추가
      count += high - low + 1;
    }
  }

  console.log(count);
  process.exit();
});
