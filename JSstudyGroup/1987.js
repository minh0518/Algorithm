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

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  let maxValue = 0;

  // 아스키코드로 A~Z까지 방문여부 판단
  const visited = new Array(90 - 65 + 1).fill(false);
  const dfs = (x, y, count) => {
    if (maxValue < count) maxValue = count;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= R || ny < 0 || ny >= C || visited[board[nx][ny].charCodeAt() - 65]) continue;
      const nextValue = board[nx][ny];
      visited[nextValue.charCodeAt() - 65] = true;
      dfs(nx, ny, count + 1);
      visited[nextValue.charCodeAt() - 65] = false;
    }
  };

  visited[board[0][0].charCodeAt() - 65] = true;
  dfs(0, 0, 1);
  console.log(maxValue);

  process.exit();
});
