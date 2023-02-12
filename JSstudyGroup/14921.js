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

  let liquid = data.shift().split(' ').map(Number);

  let [start, end] = [0, N - 1];

  let sum = 0;
  
  let min = Infinity;

  while (start < end) {
    sum = liquid[start] + liquid[end];
    if (sum === 0) {
      min = 0;
      break;
    }

    // 0부터거의 거리를 각각 비교
    if (Math.abs(sum) < Math.abs(min)) {
      min = sum;
    }

    if (sum > 0) {
      end -= 1;
      continue;
    }
    if (sum < 0) {
      start += 1;
      continue;
    }
  }

  console.log(min);

  process.exit();
});
