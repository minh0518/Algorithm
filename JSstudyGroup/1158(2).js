const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, K] = data.shift().split(' ').map(Number);

  let queue = new Array(N).fill().map((i, index) => index + 1);
  let result = [];

  let count = 0;
  while (queue.length) {
    count += 1;
    let element = queue.shift();

    if (count % K === 0) {
      result.push(element);
      continue;
    }
    queue.push(element);
  }

  console.log(`<${result.join(', ')}>`);

  process.exit();
});
// 1 2 3 4 5 6 7
