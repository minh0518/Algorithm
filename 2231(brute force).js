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
  let answer = 0;
  let start = N - (N + '').length * 9;
  if (start < 0) {
    start = 0;
  }

  for (let i = start; i < N; i++) {
    let tmp = i.toString().split('');

    let sum = i + tmp.reduce((acc, num) => acc + Number(num), 0);

    if (sum === N) {
      answer=i
      break
    }
  }

  console.log(answer);
  process.exit();
});