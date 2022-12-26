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

  let time = data.map((i) => i.split(' ').map(Number));

  time = time.sort((a, b) => {
    return a[1] - b[1] || a[0] - b[0];
  });

  let target = time[0][1];

  let result = 1;
  for (let i = 1; i < time.length; i++) {
    if (time[i][0] >= target) {
      result += 1;
      target = time[i][1];
    }
  }

  console.log(result);

  process.exit();
});

// 1 6
// 4 7

// 6 10
// 7 8
