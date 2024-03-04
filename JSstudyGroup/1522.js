const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const str = data.shift().split('');
  const aCount = str.filter((i) => i === 'a').length;

  str.push(...str.slice(0, aCount));
  let index = 0;
  let minValue = Infinity;
  while (index <= str.length - aCount) {
    const target = str.slice(index, index + aCount);
    const currentBCount = target.filter((i) => i === 'b').length;
    if (minValue > currentBCount) minValue = currentBCount;

    index += 1;
  }
  console.log(minValue);

  process.exit();
});
