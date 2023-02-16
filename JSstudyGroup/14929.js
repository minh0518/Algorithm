const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();

  let numbers = data.shift().split(' ').map(Number);
  let sum = numbers.reduce((a, b) => a + b, 0);

  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    sum -= num;
    result.push(sum * num);
  }

  console.log(result.reduce((a, b) => a + b, 0));

  process.exit();
});

// 1 (-2+3)
// -2 3

// 1 (2+3+4+5)
// 2 (3+4+5)
// 3 (4+5)
// 4 5
