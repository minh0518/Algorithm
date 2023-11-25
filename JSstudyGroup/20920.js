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
  const info = new Map();
  data
    .filter((i) => i.length >= M)
    .sort() // 사전 순 정렬을 먼저
    .forEach((i, index) => {
      info.set(i, info.has(i) ? info.get(i) + 1 : 1);
    });

  const sortedResult = [...info].sort((a, b) => {
    if (a[1] === b[1]) {
      return b[0].length - a[0].length; // 길이 내림차순
    }
    return b[1] - a[1]; // 횟수 내림차순
  });

  const answer = sortedResult
    .map((i) => {
      return i[0];
    })
    .join('\n');

  console.log(answer);

  process.exit();
});
