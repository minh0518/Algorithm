const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const info = data.map(Number);
  const root = info[0];

  const tree = new Map();
  for (const node of info) {
    tree.set(node, new Array(2).fill(null));
  }

  const dfs = (parent, node) => {
    // 왼쪽 서브 트리
    if (parent > node) {
      const parentNode = tree.get(parent);
      const left = parentNode[0];

      // 왼쪽 노드가 비었다면 해당 노드로 지정
      if (left === null) {
        parentNode[0] = node; // call by reference
      }
      // 재귀탐색
      if (left !== null) {
        dfs(left, node);
      }
    }

    // 오른쪽 서브 트리
    if (parent < node) {
      const parentNode = tree.get(parent);
      const right = parentNode[1];

      // 오른쪽 노드가 비었다면 해당 노드로 지정
      if (right === null) {
        parentNode[1] = node; // call by reference
      }
      // 재귀탐색
      if (right !== null) {
        dfs(right, node);
      }
    }
  };

  // 트리 생성
  for (let i = 1; i < info.length; i++) {
    dfs(root, info[i]);
  }

  // 후위 순회
  const current = [];
  const postOrder = (node, current) => {
    const [left, right] = tree.get(node);
    if (left) postOrder(left, current);
    if (right) postOrder(right, current);
    current.push(node);
  };

  postOrder(info[0], current);
  console.log(current.join('\n'));

  process.exit();
});
