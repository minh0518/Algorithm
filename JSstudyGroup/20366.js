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

  const calc = (i, j) => {
    const firstSnowman = arr[i] + arr[j];
    let start = 0;
    let end = N - 1;

    // 최소 격차값
    let minValue = Infinity;

    while (start < end) {
      // i,j에 겹치지 않도록 start와 end위치 조정
      while (start === i || start === j) start += 1;
      while (end === i || end === j) end -= 1;
      if (start >= end) break;

      // start와 end로 눈사람 생성 및 최소격차 갱신
      const secondSnowman = arr[start] + arr[end];
      const gap = Math.abs(firstSnowman - secondSnowman);
      if (minValue > gap) minValue = gap;

      // start와 end 이동
      if (firstSnowman < secondSnowman) {
        end -= 1;
      }
      if (firstSnowman > secondSnowman) {
        start += 1;
      }
      if (firstSnowman === secondSnowman) {
        return 0;
      }
    }
    return minValue;
  };

  const results = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      // 첫번째 눈사람에 사용된 i, j를 기반으로 최소격차를 가진 두번째 눈사람을 구함
      results.push(calc(i, j));
    }
  }
  console.log(Math.min(...results));

  process.exit();
});
