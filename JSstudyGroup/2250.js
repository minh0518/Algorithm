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
  const info = data.map((row) => row.split(' ').map(Number));
  const tree = new Map();
  for (let i = 1; i <= N; i++) {
    tree.set(i, new Array(2).fill(null));
  }

  // 트리 생성 및 연결 횟수에 따른 루트 노드 판별
  const countArr = new Array(N + 1).fill(0);
  for (const [node, left, right] of info) {
    if (node !== -1) countArr[node] += 1;
    if (left !== -1) countArr[left] += 1;
    if (right !== -1) countArr[right] += 1;

    // 트리 초기화
    tree.set(node, [left === -1 ? null : left, right === -1 ? null : right]);
  }
  const root = countArr.indexOf(1);

  // 열 카운트 변수
  // 중위 순회를 하며 방문된 순서대로 열 좌표가 된다. 이는 재귀에 종속적이면 안되므로 전역으로 두고 갱신
  let count = 1;
  /** 현재 노드, 노드정보 Map객체, 뎊스(=행 좌표) */
  const inOrder = (node, nodeInfo, depth) => {
    const [left, right] = tree.get(node);

    if (left) inOrder(left, nodeInfo, depth + 1);
    nodeInfo.set(depth, nodeInfo.has(depth) ? [...nodeInfo.get(depth), count++] : [count++]);
    if (right) inOrder(right, nodeInfo, depth + 1);
  };

  const nodeInfo = new Map();
  inOrder(root, nodeInfo, 1);

  // 정답 도출
  let maxWidth = 0;
  let level = 0;
  const sortedNodeInfo = [...nodeInfo].sort((a, b) => a[0] - b[0]);
  for (const [key, value] of sortedNodeInfo) {
    const gap = value.at(-1) - value[0] + 1;
    if (gap > maxWidth) {
      level = key;
      maxWidth = gap;
    }
  }

  console.log(`${level} ${maxWidth}`);

  process.exit();
});
