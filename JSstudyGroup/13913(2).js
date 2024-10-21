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
    // visited쓰면 메모리초과 뜸
    const dp = new Array(MAX + 1).fill(Infinity);
    dp[N] = 0;
    const queue = [];
    queue.push([N, 0, `${N}`]); // 노드, 비용, 로그

    let index = 0;
    while (index < queue.length) {
      const [node, value, log] = queue[index++];

      const nextValue = value + 1;
      const nextNodes = [node * 2, node + 1, node - 1];

      for (const nextNode of nextNodes) {
        if (nextNode < 0 || nextNode > MAX || dp[nextNode] <= nextValue) continue;
        if (nextNode === K) {
          return [nextValue, log + ` ${K}`];
        }
        dp[nextNode] = nextValue;
        queue.push([nextNode, nextValue, log + ` ${nextNode}`]);
      }
    }
  };
  if (N === K) console.log(`0\n${N}`);
  else {
    const result = bfs();
    console.log(result.join('\n'));
  }

  process.exit();
});
