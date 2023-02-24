const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const test = (...arr) => {
    console.log(arr);
  };

  test([1, 2, 3, 4]);

  process.exit();
});
