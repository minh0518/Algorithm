const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [R, C] = data.shift().split(' ').map(Number);
  const board = data.map((i) => i.split(''));

  // 우상, 우, 우하
  const [dx, dy] = [
    [-1, 0, 1],
    [1, 1, 1],
  ];

  const dfs = (x, y) => {
    board[x][y] = 1;

    // 마지막 열 도착시(=성공), 즉시 재귀 종료
    if (y === C - 1) return true;

    for (let i = 0; i < 3; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= R || ny < 0 || ny >= C || board[nx][ny] === 'x' || board[nx][ny] === 1) continue;
      if (dfs(nx, ny)) return true;
    }
  };

  let count = 0;
  for (let i = 0; i < R; i++) {
    if (dfs(i, 0)) count += 1;
  }
  console.log(count);

  process.exit();
});
