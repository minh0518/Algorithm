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
      .map((i, index) => index)
      .fill(false, 0, 2);

    for (let i = 2; i * i <= num; i++) {
      if (arr[i]) {
        for (let j = i * i; j <= num; j += i) {
          arr[j] = false;
        }
      }
    }

    return arr;
  };

  let primeNumbers = solution(N).filter((i) => i);

  let start = 0;
  let end = 1;
  let count = 0;

  let sum = primeNumbers[start] + primeNumbers[end];
  while (end < primeNumbers.length - 1) {
    if (sum === N) {
      count += 1;
      end += 1;
      sum += primeNumbers[end];
      continue;
    }

    if (sum > N) {
      sum -= primeNumbers[start];
      start += 1;
    }

    if (sum < N) {
      end += 1;
      sum += primeNumbers[end];
    }
  }

  // 마지막 소수가 자기 자신인 경우
  if (primeNumbers[primeNumbers.length - 1] === N) count += 1;

  console.log(count);

  process.exit();
});