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
  const info = data.map((i) => i.split(' ').map(Number)).sort((a, b) => b[0] - a[0]);
  const rootArr = new Array(10001).fill(undefined).map((_, index) => index);

  let result = 0;

  const find = (target) => {
    if (target === rootArr[target]) return target;
    rootArr[target] = find(rootArr[target]);
    return rootArr[target];
  };
  const union = (current, target) => {
    const currentRoot = find(current);
    const targetRoot = find(target);

    rootArr[currentRoot] = targetRoot;
  };

  for (let [p, d] of info) {
    const root = find(d);

    if (root === 0) continue;

    result += p;
    union(root, root - 1);
  }
  console.log(result);

  process.exit();
});
