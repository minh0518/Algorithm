const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();
  const originCards = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);
  const M = +data.shift();
  const target = data.shift().split(' ').map(Number);

  const answer = [];
  const search = (targetNum) => {
    let left = 0;
    let right = originCards.length - 1;

    let result = false;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      const midNumber = originCards[mid];
      if (midNumber === targetNum) {
        result = true;
        break;
      }
      if (midNumber > targetNum) {
        right = mid - 1;
      }
      if (midNumber < targetNum) {
        left = mid + 1;
      }
    }
    answer.push(result ? 1 : 0);
  };
  for (let i of target) {
    search(i);
  }
  console.log(answer.join(' '));

  process.exit();
});
