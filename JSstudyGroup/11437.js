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
  const info = data.slice(0, N - 1).map((i) => i.split(' ').map(Number));
  const M = +data[N - 1];
  const targets = data.slice(N).map((i) => i.split(' ').map(Number));

  // 트리 그래프
  const graph = new Array(N + 1).fill(undefined).map(() => []);

  // 부모 노드 정보
  // parent[3]=2 >> 3번노드의 부모노드는 2
  const parent = new Array(N + 1).fill(0);

  // 각 노드의 깊이가 계산되었는지 여부
  const visited = new Array(N + 1).fill(0);

  // 각 노드까지의 깊이
  // depthArr[3]=2 >> 3번노드의 깊이는 2
  const depthArr = new Array(N + 1).fill(0);

  // 그래프 생성
  for (const [from, to] of info) {
    graph[from].push(to);
    graph[to].push(from);
  }

  // 루트 노드부터 시작하여 깊이(depth)를 구하는 함수
  const dfs = (node, depth) => {
    visited[node] = true;
    depthArr[node] = depth;

    const nextNodes = graph[node];
    for (const nextNode of nextNodes) {
      if (visited[nextNode]) continue;
      parent[nextNode] = node;
      dfs(nextNode, depth + 1);
    }
  };

  // a와 b의 최소 공통 조상을 찾는 함수
  const lca = (a, b) => {
    // 깊이(depth)가 같아질 때까지 위로 올라간다
    while (depthArr[a] !== depthArr[b]) {
      if (depthArr[a] > depthArr[b]) a = parent[a];
      else b = parent[b];
    }

    // 노드가 같아질 때까지
    while (a !== b) {
      a = parent[a];
      b = parent[b];
    }
    return a;
  };

  dfs(1, 0);

  const result = [];
  for (const [from, to] of targets) {
    result.push(lca(from, to));
  }
  console.log(result.join('\n'));

  process.exit();
});
