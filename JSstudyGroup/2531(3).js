const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, d, k, c] = data.shift().split(' ').map(Number);

  const dishes = [...data.map(Number), ...data.slice(0, k - 1).map(Number)];

  let first = 0;
  let second = k;

  let maxCount = 0;
  while (second <= dishes.length) {
    const current = dishes.slice(first, second);

    const eatCount = new Set([...current, c]).size;

    if (maxCount < eatCount) maxCount = eatCount;

    while (1) {
      if (current.includes(dishes[second - 1])) {
        second += 1;
      } else {
        first = second - k;
        break;
      }
    }
  }

  console.log(maxCount);

  process.exit();
});
