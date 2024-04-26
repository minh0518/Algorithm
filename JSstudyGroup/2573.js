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
  let board = data.map((i) => i.split(' ').map(Number));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const melt = (board, row, col) => {
    let zeroCount = 0;
    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + row;
      const ny = dy[i] + col;

      if (nx < 0 || nx >= N || ny < 0 || ny >= M || board[nx][ny] !== 0) continue;
      zeroCount += 1;
    }

    const meltResult = board[row][col] - zeroCount;

    // 현재 턴에서 녹아서 0이 돼버린 좌표는 x표시
    // 남은 좌표에서는 x를 0으로 카운트하지 않아야 한다
    if (meltResult <= 0) {
      board[row][col] = 'x';
    }
    if (meltResult > 0) {
      board[row][col] = meltResult;
    }
  };

  const dfs = (x, y, visited) => {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= N || ny < 0 || ny >= M || visited[nx][ny] || board[nx][ny] === 0 || board[nx][ny] === 'x')
        continue;
      dfs(nx, ny, visited);
    }
  };

  let year = 0;

  // 메인 로직
  while (!board.every((row) => row.every((col) => col === 0))) {
    year += 1;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const value = board[i][j];
        if (value === 0) continue;
        melt(board, i, j);
      }
    }

    const visited = new Array(N).fill(undefined).map(() => new Array(M).fill(false));
    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (board[i][j] === 0) continue;

        // 다음 턴에서는 x가 0으로 인식돼야 하므로 다시 변경해준다
        if (board[i][j] === 'x') {
          board[i][j] = 0;
          continue;
        }

        if (!visited[i][j]) {
          // dfs로 인접한 빙산들을 방문한 횟수가 분리된 덩어리들의 갯수
          dfs(i, j, visited);
          count += 1;
        }
      }
    }

    if (count >= 2) break;
  }
  if (board.every((row) => row.every((col) => col === 0))) console.log(0);
  else console.log(year);

  process.exit();
});
