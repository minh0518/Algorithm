const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = data.shift()

  let M = +data.shift();

  let fromHundred = N - 100;

  let disabled;

  if (M !== 0) {
    let count=0

    disabled = data.shift().split(' ').map(Number);

    for (let i = 0; i < 1000000; i++) {
      const numString = i.toString();
      let isValid = true;
      for (let j = 0; j < numString.length; j++) {
        if (disabled[numString[j]]) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        count = Math.min(count, Math.abs(i - N) + numString.length);
      }
    }

    console.log(count)
  } else {
    console.log(N.length);
  }

  //6 7 8 9 o
  //9871
  //9876 --
  //9869 ++

  //0 1 2 3 4 5 6 o
  //3219
  //3216 ++
  //3220 --

  //0 6 8 o
  //6871
  //6866 ++
  //6880 --

  process.exit();
});
