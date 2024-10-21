const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const MAX = 100000;
  const [N, K] = data.shift().split(' ').map(Number);

  const bfs = () => {
    const visited = new Array(MAX + 1).fill(false);
    const path = new Array(MAX + 1).fill(null);
    visited[N] = true;
    const queue = [];
    queue.push([N, 0]); // 노드, 비용

    let index = 0;
    while (index < queue.length) {
      const [node, value] = queue[index++];

      const nextValue = value + 1;
      const nextNodes = [node * 2, node + 1, node - 1];

      for (const nextNode of nextNodes) {
        if (nextNode < 0 || nextNode > MAX || visited[nextNode]) continue;

        visited[nextNode] = true;
        path[nextNode] = node; // nextNode는 node에서 이동한 것
        if (nextNode === K) {
          return [nextValue, path];
        }
        queue.push([nextNode, nextValue]);
      }
    }
  };

  if (N === K) console.log(`0\n${N}`);
  else {
    const [value, path] = bfs();

    // bfs 역추적 (K부터 역추적 진행)
    const order = [K];
    for (let i = 0; i < value; i++) {
      order.push(path[order.at(-1)]);
    }
    console.log(`${value}\n${order.reverse().join(' ')}`);
  }

  process.exit();
});
