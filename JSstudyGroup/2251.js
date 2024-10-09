const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const info = data.shift().split(' ').map(Number);
  const [A, B, C] = info;

  const dir = [
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 1],
  ];

  const result = new Set();

  const dfs = (status, visited) => {
    if (status[0] === 0) {
      result.add(status[2]);
    }

    for (let i = 0; i < dir.length; i++) {
      const [from, to] = dir[i];
      if (status[from] === 0) continue;

      const newStatus = [...status];

      // 옮기려는 물통의 양, 담으려는 물통의 현재 가용량 중 최솟값
      const gap = Math.min(newStatus[from], info[to] - newStatus[to]);
      newStatus[from] -= gap;
      newStatus[to] += gap;

      // 이미 존재하는 물통의 상태라면 패스
      if (visited[newStatus[0]][newStatus[1]]) continue;

      visited[newStatus[0]][newStatus[1]] = true;
      dfs(newStatus, visited);
    }
  };

  dfs(
    [0, 0, C],
    new Array(201).fill(undefined).map(() => new Array(201).fill(false)),
  );

  console.log([...result].sort((a, b) => a - b).join(' '));

  process.exit();
});
