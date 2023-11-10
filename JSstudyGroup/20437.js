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
    const W = data[index].split('');
    const K = +data[index + 1];

    const strInfo = new Map();

    let minValue = Infinity;
    let maxValue = 0;
    const candidates = new Set();
    for (let i = 0; i < W.length; i++) {
      const str = W[i];
      strInfo.set(str, strInfo.has(str) ? [...strInfo.get(str), i] : [i]);

      if (strInfo.get(str).length >= K) candidates.add(str);
    }

    if (candidates.size === 0) {
      result.push(-1);
      index += 2;
      continue;
    }

    for (let str of candidates) {
      const indexArr = strInfo.get(str);
      for (let i = 0; i <= indexArr.length - K; i++) {
        const sliced = indexArr.slice(i, i + K);
        const gap = sliced[sliced.length - 1] - sliced[0] + 1;
        if (gap > maxValue) maxValue = gap;
        if (gap < minValue) minValue = gap;
      }
    }

    result.push(`${minValue} ${maxValue}`);

    index += 2;
  }

  console.log(result.join('\n'));

  process.exit();
});
