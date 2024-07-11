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

  const info = data.shift().split(' ').map(Number);

  const stack = [];

  let count = 0;
  for (let i = 0; i < info.length; i++) {
    const current = info[i];
    if (!stack.length || stack[stack.length - 1] > current) {
      stack.push(current);
      continue;
    }
    if (stack[stack.length - 1] === current) {
      // stack.pop()
      count += 1;
      continue;
    }

    while (stack.length) {
      const topValue = stack[stack.length - 1];
      if (topValue < current) stack.pop();
      if (topValue >= current) break;
    }
    if (stack[stack.length - 1] === current) count += 1;
    else stack.push(current);
  }

  console.log(count);

  process.exit();
});
