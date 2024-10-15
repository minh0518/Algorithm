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
  const M = +data.shift();
  const info = data.slice(0, -1).map((row) => row.split(' ').map(Number));
  const [start, end] = data.at(-1).split(' ').map(Number);
  const graph = new Array(N + 1).fill(undefined).map(() => []);

  for (const [from, to, value] of info) {
    graph[from].push({ to, value });
  }

  const dp = new Array(N + 1).fill(Infinity);
  dp[start] = 0;

  const dfs = (currentNode, currentValue) => {
    dp[currentNode] = currentValue;
    const nextNodes = graph[currentNode];

    // 비용이 낮은 곳부터 먼저 탐색을 위해 정렬
    // 비용이 적은 경로로 먼저 탐색했기 때문에
    // 해당 노드를 통한 다른 경로로 굳이 탐색하지 않는다
    nextNodes.sort((a, b) => a.value - b.value);

    for (const { to, value } of nextNodes) {
      if (value + currentValue >= dp[to]) continue;
      dfs(to, value + currentValue);
    }
  };
  dfs(start, 0);

  console.log(dp[end]);

  process.exit();
});
