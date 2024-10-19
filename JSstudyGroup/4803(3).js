const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let index = 0;

  const find = (node, parentArr) => {
    if (parentArr[node] === node) return node;
    parentArr[node] = find(parentArr[node], parentArr);
    return parentArr[node];
  };

  const union = (from, to, parentArr, cycled) => {
    const fromEnd = find(from, parentArr);
    const toEnd = find(to, parentArr);

    // 부모가 같으면 싸이클 존재
    if (fromEnd === toEnd) cycled.push(fromEnd);

    // 숫자가 작은 노드가 부모, 큰 노드가 자식
    if (fromEnd < toEnd) parentArr[toEnd] = fromEnd;
    if (fromEnd > toEnd) parentArr[fromEnd] = toEnd;
  };

  const solution = (n, m, info) => {
    let treeCount = 0;

    const cycled = [];
    const parentArr = new Array(n + 1).fill(undefined).map((_, index) => index);
    for (const [from, to] of info) {
      union(from, to, parentArr, cycled);
    }

    const parentSet = new Set();
    for (let i = 1; i < parentArr.length; i++) {
      parentSet.add(find(i, parentArr));
    }
    const cycledSet = new Set();
    for (const node of cycled) {
      cycledSet.add(find(node, parentArr));
    }

    treeCount = Math.abs(cycledSet.size - parentSet.size);

    if (treeCount === 0) return 'No trees.';
    if (treeCount === 1) return 'There is one tree.';
    else return `A forest of ${treeCount} trees.`;
  };

  const result = [];
  while (1) {
    const [n, m] = data[index].split(' ').map(Number);
    if (n === 0 && m === 0) break;
    const info = data.slice(index + 1, index + 1 + m).map((row) => row.split(' ').map(Number));

    const treeString = solution(n, m, info);
    result.push(`Case ${result.length + 1}: ${treeString}`);

    index += 1 + m;
  }
  console.log(result.join('\n'));

  process.exit();
});
