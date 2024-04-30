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
    return zeroCount;
  };

  const dfs = (x, y, visited) => {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= N || ny < 0 || ny >= M || visited[nx][ny] || board[nx][ny] === 0) continue;
      dfs(nx, ny, visited);
    }
  };

  let year = 0;
  while (!board.every((row) => row.every((col) => col === 0))) {
    year += 1;

    // 현재 year에 맞는 얼음들이 녹는 정보를 담는 배열
    const changeInfo = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const value = board[i][j];
        if (value === 0) continue;

        // 현재 좌표에 대해 녹는 양을 반환
        const zeroCount = melt(board, i, j);
        const meltResult = value - zeroCount;
        changeInfo.push([i, j, meltResult < 0 ? 0 : meltResult]);
      }
    }

    // changeInfo를 통해 얼음이 녹는 것들을 한번에 반영
    for (let [i, j, value] of changeInfo) {
      board[i][j] = value;
    }

    const visited = new Array(N).fill(undefined).map(() => new Array(M).fill(false));
    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (board[i][j] === 0) continue;
        if (!visited[i][j]) {
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
