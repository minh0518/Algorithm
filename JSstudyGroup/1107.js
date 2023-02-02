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

  let M = +data.shift();

  let disable=[];
  if (M !== 0) {
    disable = data.shift().split(' ').map(Number);
  }

  const checkPossible = (num) => {
    if (num === 0 && disable.includes(0)) {
      return false;
    }

    while (num > 0) {
      let lastNumber = num % 10;

      if (disable.includes(lastNumber)) return false;

      num = Math.floor(num / 10);
    }

    return true;
  };

  let min = 999999;
  let valueFromHundred = Math.abs(100 - N);

  for (let remoteNum = 0; remoteNum <= 999999; remoteNum++) {
    let isPossible = checkPossible(remoteNum);
    if (isPossible) {
      let totalCount = (remoteNum + '').length + Math.abs(N - remoteNum);

      if (totalCount < min) {
        min = totalCount;
      }
    }
  }

  console.log(Math.min(min, valueFromHundred));

  process.exit();
});
