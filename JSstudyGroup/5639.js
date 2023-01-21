const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const originTree = {};

  for (let i of data) {
    originTree[i] = [0, 0];
  }

  let root = Number(data[0]);
  let parent = root;

  const makeOriginTree = (node) => {
    if (parent > node) {
      if (originTree[parent][0] === 0) {
        originTree[parent][0] = node;
        return;
      } else {
        parent = originTree[parent][0];
        makeOriginTree(node);
        parent = root;
        return;
      }
    }

    if (parent < node) {
      if (originTree[parent][1] === 0) {
        originTree[parent][1] = node;
        return;
      } else {
        parent = originTree[parent][1];
        makeOriginTree(node);
        parent = root;
        return;
      }
    }
  };

  for (let i = 1; i < data.length; i++) {
    makeOriginTree(Number(data[i]));
    // parent = root;
  }

  let result = '';
  const postOrder = (node) => {
    if (originTree[node][0]) {
      postOrder(originTree[node][0]);
    }
    if (originTree[node][1]) {
      postOrder(originTree[node][1]);
    }

    result += `${node}\n`;
  };
  postOrder(root);
  console.log(result.trim());

  process.exit();
});
