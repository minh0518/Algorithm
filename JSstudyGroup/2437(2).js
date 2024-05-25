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

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (sum + 1 < value) break;
    sum += value;
  }

  console.log(sum + 1);

  process.exit();
});
