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

  // N이 속해있는 S의 번호
  // 사이드, 중간, 문자열의  전체 길이 파악
  let SNumber = 0;
  let side = 0;
  let middle = SNumber + 3;
  let totalLength;
  while (1) {
    totalLength = middle + side * 2;
    if (totalLength >= N) break;

    SNumber += 1;
    middle = SNumber + 3;
    side = totalLength;
  }

  const search = (target, totalLength, middle) => {
    const side = (totalLength - middle) / 2;

    // 첫번째 구역의 끝좌표
    const firstEnd = side;
    // 중간 구역의 끝좌표
    const midEnd = side + middle;

    if (target <= firstEnd) {
      return search(target, side, middle - 1);
    }
    if (target > firstEnd && target <= midEnd) {
      if (target - side === 1) return 'm';
      return 'o';
    }
    if (target > midEnd) {
      return search(target - (middle + side), side, middle - 1);
    }
  };

  console.log(search(N, totalLength, middle));

  process.exit();
});
