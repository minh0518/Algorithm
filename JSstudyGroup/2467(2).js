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
  const info = data.shift().split(' ').map(Number);

  let first = 0;
  let end = info.length - 1;
  let minValue = Infinity;
  let sum;

  let result;

  if (N === 2) {
  }
  while (end !== first) {
    sum = Math.abs(info[first] + info[end]);
    // console.log(first, end, sum);
    if (sum === 0) {
      result = [first, end];
      break;
    }

    if (minValue > sum) {
      minValue = sum;
      result = [first, end];
    }

    const nextFirst = first + 1;
    const nextEnd = end - 1;
    const sumByNextFirst = Math.abs(info[nextFirst] + info[end]);
    const sumByNextEnd = Math.abs(info[first] + info[nextEnd]);

    if (sumByNextFirst < sumByNextEnd) first = nextFirst;
    if (sumByNextFirst > sumByNextEnd) end = nextEnd;
    if (sumByNextFirst === sumByNextEnd) {
      first = nextFirst;
      end = nextEnd;
    }
  }
  console.log(`${info[result[0]]} ${info[result[1]]}`);

  process.exit();
});
