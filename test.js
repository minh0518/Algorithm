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
  while (end !== primeNumbers.length - 1) {
    let tmp = primeNumbers.slice(start, end);
    let sum = tmp.reduce((a, b) => a + b, 0);
    if (sum === N) {
      count += 1;
      start += 1;
      end += 1;
      continue;
    }
    if (sum > N) {
      start += 1;
      continue;
    }
    if (sum < N) {
      end += 1;
      continue;
    }
  }

  if (primeNumbers[primeNumbers.length - 1] === N) count += 1;

  console.log(count);

  process.exit();
});
