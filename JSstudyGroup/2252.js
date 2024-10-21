const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M] = data.shift().split(' ').map(Number);
  const info = data.map((row) => row.split(' ').map(Number));

  // 연결 그래프
  const graph = new Array(N + 1).fill(undefined).map(() => []);

  // 자신 노드에 연결된 간선의 개수
  const linkedCount = new Array(N + 1).fill(0);

  for (const [first, second] of info) {
    linkedCount[first] += 1;
    graph[second].push(first);
  }

  // 위상정렬
  const bfs = () => {
    const result = [];
    const queue = [];
    for (let i = 1; i < linkedCount.length; i++) {
      const count = linkedCount[i];
      if (count !== 0) continue;
      result.push(i);
      queue.push(i);
    }

    let index = 0;
    while (index < queue.length) {
      const node = queue[index++];
      const nextNodes = graph[node];
      for (const nextNode of nextNodes) {
        linkedCount[nextNode] -= 1;
        if (linkedCount[nextNode] === 0) {
          result.push(nextNode);
          queue.push(nextNode);
        }
      }
    }

    return result.reverse();
  };

  const result = bfs();
  console.log(result.join(' '));

  process.exit();
});
