const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // LIS

  const N = +data.shift();
  const info = data.shift().split(' ').map(Number);

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

  // LDS를 구하기 위해 기존 배열을 거꾸로
  const info_reverse = [...info].reverse();

  // LIS길이를 담는 백터
  const vector = [];
  vector.push(info[0]);

  // LDS길이를 담는 백터
  const vector_reverse = [];
  vector_reverse.push(info_reverse[0]);

  // 각 좌표별 LIS길이를 저장하기 위한 배열
  const dp = new Array(N).fill(0);
  dp[0] = 1;

  // 각 좌표별 LDS길이를 저장하기 위한 배열
  const dp_reverse = new Array(N).fill(0);
  dp_reverse[0] = 1;

  for (let i = 1; i < N; i++) {
    const current = info[i];
    if (vector.at(-1) < current) {
      vector.push(current);
    } else {
      const index = lowerBound(vector, current);
      vector.splice(index, 1, current);
    }

    const current_reverse = info_reverse[i];
    if (vector_reverse.at(-1) < current_reverse) {
      vector_reverse.push(current_reverse);
    } else {
      const index = lowerBound(vector_reverse, current_reverse);
      vector_reverse.splice(index, 1, current_reverse);
    }

    // 각 좌표별 LIS, LDS 길이 저장
    dp[i] = vector.length;
    dp_reverse[i] = vector_reverse.length;
  }

  // LDS는 기존 배열을 역순으로 두고 구한 것이므로,
  // LIS와의 인덱스를 맞추기 위해 다시 거꾸로 되돌려야 한다
  dp_reverse.reverse();

  let maxValue = 0;
  for (let i = 0; i < dp.length; i++) {
    const sum = dp[i] + dp_reverse[i];
    if (maxValue < sum) maxValue = sum; // 합의 최댓값이 정답
  }

  // 겹치는 부분은 중복되므로 -1
  console.log(maxValue - 1);

  process.exit();
});
