const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, R, Q] = data.shift().split(' ').map(Number);

  // 트리 생성
  const tree = new Array(N + 1).fill(undefined).map(() => []);
  data.slice(0, N - 1).forEach((row) => {
    const [U, V] = row.split(' ').map(Number);
    tree[U].push(V);
    tree[V].push(U);
    // 문제 자체가 부모 -> 자식 형태로 주어진게 아니라서 양방향으로 구현 하고
    // 방문 배열로 재방문을 막아야 함
  });

  const queries = data.slice(N - 1).map(Number);

  const info = new Map();
  const dfs = (node, visited) => {
    visited[node] = true;
    const nextNodes = tree[node].filter((i) => !visited[i]);

    let count = 1; // 자기 자신 카운트

    for (const nextNode of nextNodes) {
      count += dfs(nextNode, visited); // 자신 포함 자식 노드 개수 누적
    }
    info.set(node, count);

    return count;
  };

  const visited = new Array(N + 1).fill(false);
  dfs(R, visited);

  const result = [];
  for (const query of queries) {
    result.push(info.get(query));
  }
  console.log(result.join('\n'));

  process.exit();
});
