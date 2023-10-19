const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const numbers = data.shift().split('');

  let current = 1;
  let index = 0;
  while (index < numbers.length) {
    const currentArr = String(current).split('');

    let sameIndex = currentArr.indexOf(numbers[index]);
    if (sameIndex !== -1) {
      for (let i = sameIndex; i < currentArr.length; i++) {
        if (currentArr[i] === numbers[index]) {
          index += 1;
        }
      }
    }

    current += 1;
  }

  console.log(current - 1);

  process.exit();
});
