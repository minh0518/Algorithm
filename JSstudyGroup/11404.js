const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
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

    for (const [from, to, value] of info) {
      if (graph[from][to] < value) continue;
      graph[from][to] = value;
    }

    const bfs = (start) => {
      // 현재 start노드를 시작점으로, 노드별 최소비용을 담고 있는 dp배열
      const dp = new Array(n + 1).fill(Infinity);
      dp[start] = 0;
      const queue = [];
      queue.push([start, 0]);

      while (queue.length) {
        const [currentNode, currentValue] = queue.shift();
        const nextNodes = graph[currentNode];

        for (let node = 1; node < nextNodes.length; node++) {
          if (nextNodes[node] === Infinity) continue;
          const nextValue = currentValue + nextNodes[node];
          if (dp[node] <= nextValue) continue;
          dp[node] = nextValue;
          queue.push([node, nextValue]);
        }
      }
      return dp.slice(1);
    };

    const result = [];
    for (let startNode = 1; startNode <= n; startNode++) {
      let dp = bfs(startNode);
      dp = dp.map((i) => {
        if (i === Infinity) return 0;
        return i;
      });

      result.push([...dp]);
    }
    console.log(result.map((row) => row.join(' ')).join('\n'));

    process.exit();
  });

  process.exit();
});
