const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const G = +data.shift();
  const P = +data.shift();
  const planes = data.map(Number);

  const info = new Array(G + 1).fill(undefined).map((_, index) => index);

  const find = (target) => {
    if (target === info[target]) return target;
    info[target] = find(info[target]);
    return info[target];
  };

  const union = (targetValue, currentValue) => {
    const targetRoot = find(targetValue);
    const currentRoot = find(currentValue);
    info[currentRoot] = targetRoot;
  };

  let count = 0;
  for (let plane of planes) {
    // 현재 비행기가 사용할 수 있는 루트 창구
    const root = find(plane);
    if (root === 0) break;

    // 루트 창구 갱신
    union(root - 1, root);
    count += 1;
  }

  console.log(count);

  process.exit();
});
