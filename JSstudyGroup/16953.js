const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [A, B] = data.shift().split(' ').map(Number);

  let count = 0;
  while (A < B) {
    count += 1;
    if (B % 2 === 0) B /= 2;
    else if (B % 10 === 1) {
      B = Math.floor(B / 10);
    } else break;
  }

  if (A === B) console.log(count + 1);
  if (A !== B) console.log(-1);

  process.exit();
});
