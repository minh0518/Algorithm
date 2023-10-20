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

  let maxSize = 0;
  for (let i = 0; i <= dishes.length - k; i++) {
    const sliced = new Set([...dishes.slice(i, i + k), c]);
    if (maxSize < sliced.size) {
      maxSize = sliced.size;
    }
  }
  console.log(maxSize);

  process.exit();
});
