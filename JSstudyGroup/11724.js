const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number);

  let info = data.map((i) => i.split(' ').map(Number));

  let graph = new Array(N + 1).fill().map(() => []);

  let visited = new Array(N + 1).fill(false);

  for (let i of info) {
    let [from, to] = i;

    graph[from].push(to);
    graph[to].push(from);
  }

  // console.log(graph)

  const dfs = (index) => {
    visited[index] = true;

    let node = graph[index];

    for (let i of node) {
      if (!visited[i]) dfs(i);
    }
  };

  let result = 0;
  for (let i = 1; i < graph.length; i++) {
    if (!visited[i]) {
      dfs(i);
      result += 1;
    }
  }

  console.log(result);

  process.exit();
});
