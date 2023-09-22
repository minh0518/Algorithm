const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const start = data.shift().split('');
  const target = data.shift().split('');

  while (target.length !== start.length) {
    const lastStr = target.pop();
    if (lastStr === 'B') target.reverse();
  }
  if (target.join('') === start.join('')) console.log(1);
  if (target.join('') !== start.join('')) console.log(0);

  process.exit();
});
