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
  const info = data.map(Number);

  const fromBottom = info.filter((_, index) => index % 2 === 0).sort((a, b) => a - b);
  const fromTop = info.filter((_, index) => index % 2 === 1).sort((a, b) => a - b);

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

    // lowerbound인덱스 기준으로 최종 파괴 개수 반환
    return arr.length - left;
  };

  let minValue = Infinity;
  let count = 0;
  for (let i = 1; i <= H; i++) {
    // 석순 파괴 개수
    const countFromBottom = lowerBound(fromBottom, i);
    // 종유석 파괴 개수
    const countFromTop = lowerBound(fromTop, H - i + 1);

    const total = countFromBottom + countFromTop;

    if (total === minValue) {
      count += 1;
    }
    if (total < minValue) {
      minValue = total;
      count = 1;
    }
  }

  console.log(minValue, count);

  process.exit();
});
