const { off, mainModule } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();

  let parentInfo = data.shift().split(' ').map(Number);

  let target = +data.shift();

  let tree = new Array(N).fill().map(() => []);

  for (let i = 0; i < parentInfo.length; i++) {
    if (parentInfo[i] === -1) continue;

    tree[parentInfo[i]].push(i);
  }

  //console.log(tree);

  let visited = [];
  const dfs = (index) => {
    visited.push(index);
    if (!tree[index].length) {
      return;
    }

    let currentNode = tree[index];
    for (let i = 0; i < currentNode.length; i++) {
      let nextNode = currentNode[i];
      dfs(nextNode);
    }
  };

  dfs(target);

  //traget부분을 tree에서 제거
  for (let i = 0; i < tree.length; i++) {
    let targetIndex = tree[i].indexOf(target);
    if (targetIndex !== -1) {
      tree[i].splice(targetIndex, 1);
      break;
    }
  }

  let answer = [];
  for (let i = 0; i < tree.length; i++) {

    if (visited.includes(i) || tree[i].length) continue;

    // 방문한(삭제된) 노드 빼고 , 나머지 노드중에서 자식노드가 없을때 push
    answer.push(i);
  }

  console.log(answer.length);

  process.exit();
});
