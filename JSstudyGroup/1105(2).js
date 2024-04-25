const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [L, R] = data
    .shift()
    .split(' ')
    .map((i) => i.split('').map(Number));

  if (L.length !== R.length) {
    console.log(0);
  } else {
    let count = 0;
    for (let i = 0; i < R.length; i++) {
      const lValue = L[i];
      const rValue = R[i];

      if (lValue === 8 && rValue === 8) count += 1;
      else if (lValue !== rValue) break;
    }
    console.log(count);
  }

  process.exit();
});
