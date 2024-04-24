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
  const info = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  if (info[0] !== 1) {
    console.log(1);
  } else {
    const accArr = [info[0]];
    for (let i = 1; i < info.length; i++) {
      const value = info[i];

      // acc의 마지막 누적합 값 +1 을 한 것보다 크다면 빈 공간이 생긴 것이다
      if (accArr.at(-1) + 1 < value) break;

      accArr.push(accArr.at(-1) + value);
    }
    console.log(accArr.at(-1) + 1);
  }

  process.exit();
});
