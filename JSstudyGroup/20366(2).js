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

  // 2개의 눈으로 만들 수 있는 모든 경우의 수를 생성
  const combinations = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      // 2개의 눈 인덱스, 눈사람 크기
      combinations.push([i, j, arr[i] + arr[j]]);
    }
  }
  // 오름차순 정렬(서로 인접한 인덱스끼리의 값의 차이가 최소격차가 될 수 있으므로)
  combinations.sort((a, b) => a[2] - b[2]);

  const results = [];
  for (let i = 0; i < combinations.length - 1; i++) {
    const first = combinations[i];
    const second = combinations[i + 1];

    // 겹치는 눈은 제외
    if (first[0] === second[0] || first[0] === second[1] || first[1] === second[0] || first[1] === second[1]) continue;

    results.push(second[2] - first[2]);
  }
  console.log(Math.min(...results));

  process.exit();
});
