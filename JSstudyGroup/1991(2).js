const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  data.shift();

  let vertex = data.map((item) => item.split(' '));

  let tree = {};

  for (let i = 0; i < vertex.length; i++) {
    const [node, left, right] = vertex[i];
    tree[node] = [left, right];
  }

  let firstResult = '';
  let secondResult = '';
  let thirdResult = '';

  // 전
  const first = (node) => {
    firstResult += node;
    if (tree[node][0] !== '.') first(tree[node][0]);
    if (tree[node][1] !== '.') first(tree[node][1]);
  };

  // 중
  const second = (node) => {
    if (tree[node][0] !== '.') second(tree[node][0]);
    secondResult += node;
    if (tree[node][1] !== '.') second(tree[node][1]);
  };

  // 후
  const third = (node) => {
    if (tree[node][0] !== '.') third(tree[node][0]);
    if (tree[node][1] !== '.') third(tree[node][1]);
    thirdResult += node;
  };

  first('A');
  second('A');
  third('A');
  console.log(firstResult);
  console.log(secondResult);
  console.log(thirdResult);

  process.exit();
});