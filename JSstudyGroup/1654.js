const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [K, N] = data.shift().split(' ').map(Number);
  const lines = data.map(Number);

  let left = 1;
  let right = Math.max(...lines);
  let answer;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let add = 0;
    lines.forEach((i) => (add += Math.floor(i / mid)));

    //N개 이상이 가능하면 이제 랜선의 길이를 늘려야 함
    if (add >= N) {
      answer = mid;
      left = mid + 1;
      continue;
    }
    if (add < N) {
      right = mid - 1;
    }
  }
  console.log(answer);

  process.exit();
});
