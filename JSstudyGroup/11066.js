const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let T = +data.shift();

  let index = 0;
  const result = [];
  while (T--) {
    const N = +data[index];
    const arr = data[index + 1].split(' ').map(Number);

    // 누적합
    const accValue = [0];
    arr.reduce((a, b) => {
      accValue.push(a + b);
      return a + b;
    }, 0);

    const dp = new Array(N + 1).fill(undefined).map(() => new Array(N + 1).fill(0));

    for (let row = 0; row < N - 1; row++) {
      for (let col = 1; col < N - row; col++) {
        const [i, j] = [col, col + 1 + row];
        let minValue = Infinity;
        // 부분합
        const acc = accValue[j] - accValue[i - 1];
        for (let k = i; k < j; k++) {
          const sum = dp[i][k] + dp[k + 1][j] + acc;
          if (minValue > sum) minValue = sum;
        }
        dp[i][j] = minValue;
      }
    }

    result.push(dp[1][N]);

    index += 2;
  }

  console.log(result.join('\n'));

  process.exit();
});
