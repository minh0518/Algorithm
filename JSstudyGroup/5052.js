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

  let result = [];

  const solution = () => {
    let N = +data.shift();
    let numbers = data.splice(0, N);

    numbers.sort();

    for (let i = 0; i < numbers.length - 1; i++) {
      // 바로 뒤의 숫자랑만 비교
      let current = numbers[i];
      if (current === numbers[i + 1].slice(0, current.length)) {
        result.push('NO');
        return;
      }
    }
    result.push('YES');
  };

  while (T--) {
    solution();
  }

  console.log(result.join('\n'));

  process.exit();
});
