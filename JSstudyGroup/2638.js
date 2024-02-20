// 24.2.20
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
  const board = data.map((i) => i.split(' ').map(Number));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  // dfs로 치즈 외부 공기를 탐색
  const dfs = (x, y, visited) => {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= N || ny < 0 || ny >= M || visited[nx][ny] || board[nx][ny] === 1) continue;
      board[nx][ny] = 'x';
      dfs(nx, ny, visited);
    }
  };

  // 녹는 치즈 좌표를 0으로 변경 및 x좌표 초기화
  const changeAndRest = (changeCords) => {
    for (let [x, y] of changeCords) {
      board[x][y] = 0;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const value = board[i][j];
        if (value === 'x') board[i][j] = 0;
      }
    }
  };

  // c가 없는지 확인
  const checkDone = () => {
    return board.every((row) => {
      return row.every((col) => {
        return col !== 1;
      });
    });
  };

  let count = 0;
  while (1) {
    count += 1;

    // 치즈를 녹이는 (치즈 외부)공기를 찾은 뒤 x표시
    dfs(
      0,
      0,
      new Array(N).fill().map(() => new Array(M).fill(false)),
    );

    // 치즈 좌표에서 상하좌우 2곳 이상이 x라면 녹는 좌표changeCords에 추가
    const changeCords = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (board[i][j] !== 1) continue;
        let airCount = 0;
        for (let dir = 0; dir < 4; dir++) {
          const x = i + dx[dir];
          const y = j + dy[dir];
          if (board[x][y] === 'x') airCount += 1;
        }
        if (airCount >= 2) changeCords.push([i, j]);
      }
    }
    // 녹는 좌표 반영 및 x좌표 0으로 초기화
    changeAndRest(changeCords);
    // 끝났는지 확인
    const isDone = checkDone();
    if (isDone) break;
  }

  console.log(count);

  process.exit();
});
