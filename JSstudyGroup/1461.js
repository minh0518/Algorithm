const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M] = data.shift().split(' ').map(Number);
  const arr = data.shift().split(' ').map(Number);

  const minus = []; // 기존에 음수 방향 거리를 담는 배열
  const plus = []; // 기존에 양수 방향 거리를 담는 배열
  for (let i of arr) {
    if (i > 0) plus.push(i);
    if (i < 0) minus.push(-i); // 음수는 양수로 변환해서 추가
  }
  // 내림차순
  minus.sort((a, b) => b - a);
  plus.sort((a, b) => b - a);

  const maxValue = Math.max(minus.length ? minus[0] : 0, plus.length ? plus[0] : 0);

  let result = 0;

  let minusIndex = 0;
  while (minusIndex < minus.length) {
    // M만큼 잘라서 거리에 반영
    const slicedArr = minus.slice(minusIndex, minusIndex + M > minus.length ? minus.length : minusIndex + M);

    result += slicedArr[0] * 2;
    minusIndex += M;
  }

  let plusIndex = 0;
  while (plusIndex < plus.length) {
    // M만큼 잘라서 거리에 반영
    const slicedArr = plus.slice(plusIndex, plusIndex + M > plus.length ? plus.length : plusIndex + M);

    result += slicedArr[0] * 2;
    plusIndex += M;
  }

  // 마지막에 가장 멀리 있는 책은 왕복이 아닌 편도로 종료하므로 *1이 돼야 한다
  result -= maxValue;
  console.log(result);

  process.exit();
});
