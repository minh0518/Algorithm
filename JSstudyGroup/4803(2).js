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
    let treeCount = 0;
    const tree = new Array(n + 1).fill(undefined).map(() => []);

    for (const [from, to] of info) {
      tree[from].push(to);
      tree[to].push(from);
    }

    // 그래프를 순회하며 노드 및 간선의 개수 파악
    const dfs = (node, visited) => {
      visited[node] = true;

      const adjNodes = tree[node];
      let depth = 1; // 노드 개수
      let lines = adjNodes.length; // 현재 노드에 연결된 간선 개수
      const nextNodes = adjNodes.filter((i) => !visited[i]);

      for (const nextNode of nextNodes) {
        const [returnedDepth, returnedLine] = dfs(nextNode, visited);
        depth += returnedDepth;
        lines += returnedLine;
      }

      return [depth, lines];
    };

    const visited = new Array(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
      if (visited[i]) continue;
      const [nodeCount, lineCount] = dfs(i, visited);

      // 양방향 그래프에서 노드와 간선의 개수에 따른 트리 판별
      if (nodeCount - 1 === lineCount / 2) treeCount += 1;
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
