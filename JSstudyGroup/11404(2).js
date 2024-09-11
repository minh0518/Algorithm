const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const n = +data.shift();
  const m = +data.shift();
  const info = data.map((i) => i.split(' ').map(Number));

  const graph = new Array(n + 1).fill(undefined).map(() => new Array(n + 1).fill(Infinity));
  for (let [from, to, value] of info) {
    if (graph[from][to] < value) continue;
    graph[from][to] = value;
  }

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (i === j) {
          graph[i][j] = 0;
          continue;
        }
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  console.log(
    graph
      .map((row) =>
        row
          .slice(1)
          .map((col) => {
            if (col === Infinity) return 0;
            return col;
          })
          .join(' '),
      )
      .slice(1)
      .join('\n'),
  );

  process.exit();
});
