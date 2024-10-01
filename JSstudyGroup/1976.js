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
  const info = data.slice(0, N).map((row) => row.split(' ').map(Number));
  const targets = data.at(-1).split(' ').map(Number);

  const graph = new Array(N + 1).fill(undefined).map(() => []);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (info[i][j] === 0) continue;
      const [from, to] = [i + 1, j + 1];
      graph[from].push(to);
    }
  }

  const dfs = (currentNode, visited) => {
    visited[currentNode] = true;
    if (targets.every((i) => visited[i])) return true;

    const nextNodes = graph[currentNode];
    for (let i = 0; i < nextNodes.length; i++) {
      const nextNode = nextNodes[i];
      if (visited[nextNode]) continue;
      if (dfs(nextNode, visited)) return true;
    }
  };

  const visited = new Array(N + 1).fill(false);
  const result = dfs(targets[0], visited);

  console.log(result ? 'YES' : 'NO');
  process.exit();
});
