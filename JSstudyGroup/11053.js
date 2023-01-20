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

  let sequence = data.shift().split(' ').map(Number);

  let DP = new Array(N).fill(1);

  for (let i = 1; i < sequence.length; i++) {
    let target = sequence[i];
    let tmpArr = [];
    for (let j = 0; j < i; j++) {
      let beforeNum = sequence[j];

      if (target > beforeNum) {
        tmpArr.push(DP[j]);
      }
    }
    if (tmpArr.length) {
      DP[i] = Math.max(...tmpArr) + 1;
    }
  }

  console.log(Math.max(...DP));

  process.exit();
});
