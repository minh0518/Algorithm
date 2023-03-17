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
  const solution = (num) => {
    let arr = new Array(num + 1)
      .fill()
      .map((_, index) => index)
      .fill(false, 0, 2);

    for (let i = 2; i * i <= num; i++) {
      if (arr[i]) {
        for (let j = i * i; j <= num; j += i) {
          arr[j] = false;
        }
      }
    }

    return arr.filter((i) => i);
  };

  const primeNumbers = solution(N);

  const DP = new Array(40001).fill(0);
  DP[0] = 1;
  for (let i = 0; i < primeNumbers.length; i++) {
    let targetNum = primeNumbers[i];
    for (let j = targetNum; j <= N; j++) {
      DP[j] = (DP[j] + DP[j - targetNum]) % 123456789;
    }
  }

  // console.log(DP)
  console.log(DP[N]);

  process.exit();
});
