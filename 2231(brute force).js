const { off } = require('process');
const readline = require('readline');
const { callbackify } = require('util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = Number(data.shift());
  let answer = [];

  for (let i = 1; i <= N; i++) {
    let tmp = i;
    let sum = i;

    while (tmp > 0) {
      sum += tmp % 10;
      tmp = parseInt(tmp / 10);
    }

    if (sum == N) {
      answer.push(i);
    }
  }
  if (answer.length) {
    console.log(Math.min(...answer));
  } else {
    console.log(0);
  }

  process.exit();
});
