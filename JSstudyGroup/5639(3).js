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

  class Tree {
    constructor(v) {
      this.value = v;
      this.left = null;
      this.right = null;
    }
    insert(v) {
      if (v < this.value) {
        if (!this.left) this.left = new Tree(v); // 왼쪽 자식 노드가 비었다면
        else this.left.insert(v); // 왼쪽 자식 노드가 존재하면 해당 노드로 재귀 탐색
      }
      if (v > this.value) {
        if (!this.right) this.right = new Tree(v);
        else this.right.insert(v);
      }
    }
  }
  const originTree = new Tree(root);
  for (let i = 1; i < info.length; i++) {
    originTree.insert(Number(info[i]));
  }

  // 후위 순회
  const current = [];
  const postOrder = (originTree, current) => {
    const [left, right] = [originTree.left, originTree.right];
    if (left) postOrder(left, current);
    if (right) postOrder(right, current);
    current.push(originTree.value);
  };

  postOrder(originTree, current);

  console.log(current.join('\n'));
  process.exit();
});
