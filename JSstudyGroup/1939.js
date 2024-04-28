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
  const info = data.slice(0, M).map((i) => i.split(' ').map(Number));
  const [start, end] = data.pop().split(' ').map(Number);
  const board = new Array(N + 1).fill(undefined).map(() => []);

  for (let [from, to, value] of info) {
    board[from].push({ to, value });
    board[to].push({ to: from, value });
  }

  const calc = (from, to, target) => {
    const bfs = () => {
      const queue = [];
      queue.push(from);
      const visited = new Array(N + 1).fill(false);
      visited[from] = true;

      while (queue.length) {
        const currentNode = queue.shift();

        const nextNodes = board[currentNode];

        for (let nodeInfo of nextNodes) {
          const nextNode = nodeInfo.to;
          if (visited[nextNode] || target > nodeInfo.value) continue;
          if (nextNode === to) return true;
          visited[nextNode] = true;
          queue.push(nextNode);
        }
      }
      return false;
    };
    return bfs();
  };

  let left = 0;
  let right = 1000000000;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const isPossible = calc(start, end, mid);

    if (isPossible) {
      left = mid + 1;
    }
    if (!isPossible) {
      right = mid - 1;
    }
  }
  console.log(right);

  process.exit();
});

// 5 6
// 1 2 3
// 2 3 5
// 3 1 6
// 4 3 2
// 4 5 1
// 1 5 7
// 1 5
