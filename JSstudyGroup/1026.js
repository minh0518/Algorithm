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

  let A = data.shift().split(' ').map(Number);
  let B = data.shift().split(' ').map(Number);

  let calc = (arr1, arr2) => {
    let result = 0;
    for (let i = 0; i < N; i++) {
      result += arr1[i] * arr2[i];
    }

    return result;
  };

  A = A.sort((a, b) => a - b);
  B = B.sort((a, b) => b - a);

  console.log(calc(A, B));

  process.exit();
});
