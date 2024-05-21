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
  let maxValue = 0;

  // 양방향 그래프 생성
  for (let [from, to, value] of info) {
    if (maxValue < value) maxValue = value;
    board[from].push({ to, value });
    board[to].push({ to: from, value });
  }

  // 이분탐색에서 주어진 target 중량으로,
  // from에서 to까지 운반이 가능한지 확인

  const bfs = (target) => {
    const queue = [];
    queue.push(start);
    const visited = new Array(N + 1).fill(false);
    visited[start] = true;

    while (queue.length) {
      const currentNode = queue.shift();

      const nextNodes = board[currentNode];

      for (let nodeInfo of nextNodes) {
        const nextNode = nodeInfo.to;
        // 현재 target중량으로 다음 섬으로 가는 다리를 건널 수 없으면 continue
        if (visited[nextNode] || target > nodeInfo.value) continue;
        if (nextNode === end) return true; // 목적지로 방문 가능하다면 true반환
        visited[nextNode] = true;
        queue.push(nextNode);
      }
    }
    return false;
  };

  // 이분탐색
  let left = 0;
  let right = maxValue;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const isPossible = bfs(mid);

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
