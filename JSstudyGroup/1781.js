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
  const info = data.map((i) => i.split(' ').map(Number));
  info.sort((a, b) => b[1] - a[1]);
  const scoreArr = new Array(N + 1).fill(undefined).map((_, index) => index);

  let totalEat = 0;

  const find = (target) => {
    if (target === scoreArr[target]) return target;
    scoreArr[target] = find(scoreArr[target]);
    return scoreArr[target];
  };

  const union = (current, target) => {
    const currentRoot = find(current);
    const targetRoot = find(target);
    scoreArr[currentRoot] = targetRoot;
  };

  for (let [deadLine, value] of info) {
    const dateRoot = find(deadLine);

    if (dateRoot === 0) continue;
    totalEat += value;

    union(dateRoot, dateRoot - 1);
  }
  console.log(totalEat);

  process.exit();
});
