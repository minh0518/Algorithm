const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [R, C, W] = data.shift().split(' ').map(Number);

  let pascal = new Array(30).fill().map(() => []);
  for (let i = 0; i < 30; i++) {
    if (i === 0) {
      pascal[0].push(1);
      continue;
    }
    for (let j = 0; j <= i; j++) {
      if (j === 0) {
        pascal[i].push(1);
        continue;
      }
      if (j === i) {
        pascal[i].push(1);
        continue;
      }

      pascal[i].push(pascal[i - 1][j - 1] + pascal[i - 1][j]);
    }
  }

  let [x, y] = [R - 1, C - 1];

  let result = [];
  for (let i = x; i < x + W; i++) {
    for (let j = 0; j <= i - x; j++) {
      result.push(pascal[i][y + j]);
    }
  }

  console.log(result.reduce((a, b) => a + b));
  process.exit();
});

// 1
// 1 1
// 1 2 1
// 1 3 3 1
// 1 4 6 4 1
// 1 5 10 10 5 1
// 1 6 15 20 15 6 1