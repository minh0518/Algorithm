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

  const solution = (n, m, info) => {
    const tree = new Array(n + 1).fill(undefined).map(() => []);
    for (const [from, to] of info) {
      tree[from].push(to);
      tree[to].push(from);
    }

    const dfs = (node, visited, parent) => {
      visited[node] = true;
      const adjNodes = tree[node];

      // 인접 노드 중, 이미 방문됐었던 노드가 자신의 부모노드가 아닌 경우 싸이클이 존재
      if (adjNodes.some((i) => visited[i] && parent[node] !== i)) return false;

      const nextNodes = adjNodes.filter((i) => !visited[i]);
      for (const nextNode of nextNodes) {
        parent[nextNode] = node; // 부모 노드 배열 업데이트
        // 어차피 전역으로 사용되며 이건 백트래킹 할 이유가 없음

        // 중간에 모든 재귀 종료하고 false 반환
        if (!dfs(nextNode, visited, parent)) return false;
      }
      return true; // false가 반환되지 않을 경우, 최종 true 반환
    };

    const visited = new Array(n + 1).fill(false);
    const parent = new Array(n + 1).fill(0);

    let treeCount = 0;
    for (let i = 1; i <= n; i++) {
      if (visited[i]) continue;
      if (dfs(i, visited, parent)) {
        treeCount += 1;
      }
    }

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
