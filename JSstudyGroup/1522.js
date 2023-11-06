const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let str = data.shift().split('');
  const aCount = str.filter((i) => i === 'a').length;
  str = [...str, ...str.slice(0, aCount - 1)];

  let minValue = Infinity;
  for (let i = 0; i <= str.length - aCount; i++) {
    const target = str.slice(i, i + aCount);
    const bCount = target.filter((i) => i === 'b').length;

    if (minValue > bCount) minValue = bCount;
  }

  console.log(minValue);

  process.exit();
});
