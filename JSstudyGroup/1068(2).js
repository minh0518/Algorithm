const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();
  let nodeInfo = data.shift().split(' ').map(Number);
  let deleteNode = +data.shift();

  // 루트노드
  let rootNode;

  let tree = new Array(N).fill().map(() => []);
  for (let i = 0; i < nodeInfo.length; i++) {
    let parent = nodeInfo[i];

    if (parent === -1) {
      rootNode = i;
      continue;
    }
    tree[parent].push(i);
  }

  const dfs = (index) => {
    if (!tree[index].length) {
      return;
    }

    // 탐색과 동시에 지움
    let childTree = tree[index];
    while (childTree.length) {
      // 기존의 for문과 다르게 while문 사용 (해당 노드에서 연결된 모든 노드들을 지움)
      let nextNode = childTree.shift();
      dfs(nextNode);
    }
  };

  dfs(deleteNode);

  // tree 에서 deleteNode 자기 자신도 지워야함
  // 안 지우면 단말노드로 인식이 돼버림
  for (let i = 0; i < tree.length; i++) {
    let index = tree[i].indexOf(deleteNode);
    if (index !== -1) {
      tree[i].splice(index, 1);
    }
  }

  // dfs로 다시 탐색하며 단말노드를 찾음
  let result = 0;
  const findEnd = (index, depth) => {
    if (!tree[index].length && depth !== 0) {
      result += 1;
      return;
    }

    let childTree = tree[index];
    for (let i of childTree) {
      findEnd(i);
    }
  };

  findEnd(rootNode, 0);

  // 전체 길이가 2인 경우 둘 중 하나라도 지우면 답은 1이어야 함
  if (N === 2 && result === 0) {
    console.log(1);
  } else {
    console.log(result);
  }

  process.exit();
});
