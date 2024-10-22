const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M, X] = data.shift().split(' ').map(Number);
  const info = data.map((row) => row.split(' ').map(Number));

  const graph = new Array(N + 1).fill(undefined).map(() => []);
  for (const [from, to, value] of info) {
    graph[from].push({ to, value });
  }

  // 다익스트라
  const bfs = (start, end) => {
    if (start === end) return 0;
    const dp = new Array(N + 1).fill(Infinity);
    dp[start] = 0;
    const queue = [];
    queue.push(start);

    let index = 0;
    while (index < queue.length) {
      const currentNode = queue[index++];
      const currentValue = dp[currentNode];
      const nextNodes = graph[currentNode];

      for (const { to, value } of nextNodes) {
        if (dp[to] <= value + currentValue) continue;
        dp[to] = value + currentValue;
        queue.push(to);
        if (to === end) break;
      }
    }

    return dp[end];
  };

  const sumArr = new Array(N + 1).fill(0);
  for (let i = 1; i <= N; i++) {
    sumArr[i] += bfs(X, i);
    sumArr[i] += bfs(i, X);
  }
  console.log(Math.max(...sumArr));

  process.exit();
});
