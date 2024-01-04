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
    let arr = data[index + 1].split(' ').map(Number);
    let profit = 0;
    let maxValue = 0; // 초기 최댓값

    for (let i = arr.length - 1; i >= 0; i--) {
      const currentValue = arr[i];

      // 최댓값 갱신
      if (maxValue < currentValue) {
        maxValue = currentValue;
        continue;
      }

      // 현재 최댓값을 기준으로 수익 창출
      if (maxValue >= currentValue) {
        profit += maxValue - currentValue;
      }
    }

    result.push(profit);
    index += 2;
  }
  console.log(result.join('\n'));

  process.exit();
});
