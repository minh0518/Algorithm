const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [M, N, L] = data.shift().split(' ').map(Number);
  const shooter = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);
  const info = data.map((i) => i.split(' ').map(Number));

  const isReachable = (a, b) => {
    let left = 0;
    let right = M - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      // 사수의 위치
      const shooterCord = shooter[mid];

      const leftSection = a + b - L;
      const rightSection = a - b + L;

      if (shooterCord < leftSection) {
        left = mid + 1;
        continue;
      }
      if (shooterCord > rightSection) {
        right = mid - 1;
        continue;
      }

      // 현재 사수가 동물을 쏠 수 있는 범위에 있다면 true
      return true;
    }
    return false;
  };
  let count = 0;
  for (let i = 0; i < info.length; i++) {
    if (isReachable(...info[i])) {
      count += 1;
    }
  }

  console.log(count);
  process.exit();
});
