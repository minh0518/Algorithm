const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [ROW_LENGTH, COL_LENGTH] = data.shift().split(' ').map(Number);
  const board = data.map((row) => row.split(' ').map(Number));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const dfs = (x, y, visited) => {
    visited[x][y] = 1;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= ROW_LENGTH || ny < 0 || ny >= COL_LENGTH || visited[nx][ny] === 1) continue;

      // 다음 공기가 있는 곳으로 이동
      if (board[nx][ny] === 0) {
        dfs(nx, ny, visited);
      }
      // 주변에 치즈가 있다면 기록
      if (board[nx][ny] === 1 && visited[nx][ny] !== 2) {
        visited[nx][ny] = 2;
      }
    }
  };

  // 총 시간
  let timeCount = 0;

  // 직전 시간에 남았던 치즈의 개수
  let lastCount = board.map((row) => row.filter((col) => col === 1).length).reduce((a, b) => a + b);

  while (1) {
    timeCount += 1;

    // visited[x][y] >> 0: 공기, 1: 방문, 2: 녹게 될 치즈
    const visited = new Array(ROW_LENGTH).fill(undefined).map(() => new Array(COL_LENGTH).fill(0));
    dfs(0, 0, visited);

    let currentCheese = 0;
    for (let i = 0; i < ROW_LENGTH; i++) {
      for (let j = 0; j < COL_LENGTH; j++) {
        if (visited[i][j] === 2) board[i][j] = 0;
        if (board[i][j] === 1) currentCheese += 1;
      }
    }
    // 전부 다 0이라면 직전 치즈개수를 갱신하기 전에 먼저 break
    if (board.every((row) => row.every((col) => col === 0))) break;
    lastCount = currentCheese;
  }

  console.log([timeCount, lastCount].join('\n'));

  process.exit();
});
