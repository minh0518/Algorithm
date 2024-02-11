// 24.2.11
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, H] = data.shift().split(' ').map(Number);

  const normal = [];
  const reverse = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      normal.push(+data[i]);
    }
    if (i % 2 === 1) {
      reverse.push(+data[i]);
    }
  }
  normal.sort((a, b) => a - b);
  reverse.sort((a, b) => a - b);

  // 종유석,석순의 높이가 담긴 arr배열에서
  // height이상이 값이 나오는 lowerbound탐색 후 갯수 리턴
  const binarySearch = (height, arr) => {
    let left = 0;
    let right = N / 2 - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = arr[mid];

      if (midValue >= height) {
        right = mid - 1;
      }
      if (midValue < height) {
        left = mid + 1;
      }
    }

    // left가 lowerbound이므로 이를 기반으로 파괴되는 갯수를 반환
    return N / 2 - left;
  };

  let count = 0;
  let minValue = Infinity;
  for (let i = 1; i <= H; i++) {
    // 석순기준 높이
    const normalHeight = i;

    // 종유석 기준 높이
    const reverseHeight = H - i + 1;

    // i높이로 파괴되는 갯수
    const destoryCount = binarySearch(normalHeight, normal) + binarySearch(reverseHeight, reverse);

    if (destoryCount < minValue) {
      count = 1;
      minValue = destoryCount;
    } else if (destoryCount === minValue) {
      count += 1;
    }
  }
  console.log(minValue, count);

  process.exit();
});
