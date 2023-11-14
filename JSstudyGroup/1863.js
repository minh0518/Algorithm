const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  data.shift();
  const info = data.map((i) => i.split(' ').map(Number));

  info.sort((a, b) => {
    return a[0] - b[0];
  });

  let stack = [];
  let count = 0;
  for (let [x, y] of info) {
    if (y === 0) {
      stack = [];
      continue;
    }

    const lastValue = stack.length ? stack[stack.length - 1] : 0;

    if (lastValue < y) {
      count += 1;
    }
    if (lastValue > y && !stack.includes(y)) {
      count += 1;
    }
    if (lastValue > y && stack.includes(y)) {
      const lastIndex = stack.lastIndexOf(y);
      const sliced = stack.slice(lastIndex);
      if (sliced.filter((i) => i < y).length >= 1) count += 1;
    }
    stack.push(y);
  }
  console.log(count);
  process.exit();
});
