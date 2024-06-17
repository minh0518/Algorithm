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
  const info = data.map((i) => i.split(' ').map(Number));

  info.sort((a, b) => b[1] - a[1]);

  const scoreArr = new Array(N).fill(0);

  for (let i = 0; i < info.length; i++) {
    let [date, scroe] = [info[i][0] - 1, info[i][1]];
    if (scoreArr[date] === 0) {
      scoreArr[date] = scroe;
      continue;
    }
    if (scoreArr[date] !== 0) {
      // 전날 중에서 과제를 할당 가능한 날짜를 탐색
      while (--date >= 0) {
        if (scoreArr[date] === 0) {
          scoreArr[date] = scroe;
          break;
        }
      }
    }
  }

  console.log(scoreArr.reduce((a, b) => a + b));

  process.exit();
});
