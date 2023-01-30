const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  data.shift();

  let arr = data.shift().split(' ').map(Number);

  let dp = new Array(arr.length).fill(0);

  for (let i = 0; i < arr.length; i++) {
    // 자기 자신은 수열의 첫 값이 될 수 있으므로
    if (dp[i] == 0) dp[i] = 1;

    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        // 현재 i번째 값보다 작은 값들이 j번째 값일때

        if (dp[i] < dp[j] + 1) {
          // 동시에 dp[i] 값이 dp[j] +1 한 값보다 작다면
          // ( +1 을 한 것은 i 가 j에 이은 다음수열 값이 이 되야 하므로 )

          dp[i] = dp[j] + 1;
        }
      }
    }
  }

  console.log(Math.max(...dp));
  process.exit();
});