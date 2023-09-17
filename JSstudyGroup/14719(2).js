const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [H, W] = data.shift().split(' ').map(Number);
  const wall = data.shift().split(' ').map(Number);
  let result = 0;

  for (let i = 1; i < wall.length - 1; i++) {
    const left = Math.max(...wall.slice(0, i + 1));
    const right = Math.max(...wall.slice(i));
    const minBlock = Math.min(left, right);
    result += minBlock - wall[i];
  }
  console.log(result);
  process.exit();
});
