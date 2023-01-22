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

  // 좌 우 자식 노드가 들어가야 하므로 0 , 0으로 초기화
  for (let i of data) {
    originTree[i] = [0, 0];
  }

  let root = Number(data[0]);
  let parent = root;

  const makeOriginTree = (node) => {
    if (parent > node) {
      if (originTree[parent][0] === 0) {
        originTree[parent][0] = node;
        return
      } else {
        parent = originTree[parent][0];
        makeOriginTree(node);
        return
      }
    }

    // 24 28
    if (parent < node) {
      if (originTree[parent][1] === 0) {
        originTree[parent][1] = node;
        return
      } else {
        parent = originTree[parent][1];
        makeOriginTree(node);
        return
      }
    }
  };

  for (let i = 1; i < data.length; i++) {
    makeOriginTree(Number(data[i]));
    parent = root; // 필수
  }

  let reulst = [];
  const postOrder = (node) => {
    if (originTree[node][0]) {
      postOrder(originTree[node][0]);
    }
    if (originTree[node][1]) {
      postOrder(originTree[node][1]);
    }

    reulst.push(node);
  };
  postOrder(root);
  console.log(reulst.join('\n'));

  process.exit();
});