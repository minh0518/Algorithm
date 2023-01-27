const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let arr = [10, 20, 40, 25, 20, 50, 30, 70, 85];
  let dp = new Array(arr.length).fill(0);

  for (let i = 0; i < arr.length; i++) {
    if (dp[i] == 0) dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        if (dp[i] < dp[j] + 1) {
          dp[i] = dp[j] + 1;
        }
      }
    }
  }

  console.log(dp); // [1, 2, 3, 3, 2, 4, 4, 5, 6]
  process.exit();
});
