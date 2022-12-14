const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();

  let rank = data.map(Number);

  let result = [];

  rank.sort((a, b) => a - b);

  for (let i = 1; i <= N; i++) {
    if (rank[i - 1] !== i) {
      result.push(Math.abs(i - rank[i - 1]));
    }
  }
  // 1 1 2 3 5
  // 1 2 3 4 5
  //   1 1 1

  console.log(result.reduce((a, b) => a + b, 0));

  process.exit();
});

// 1 2 3 4 5 8 (6 7)
// 2 5

// 2>6  4
// 5>7  2
// 5>6 1
// 2>7 5
