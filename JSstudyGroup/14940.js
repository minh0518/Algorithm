const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [n, m] = data.shift().split(' ').map(Number);
  const board = data.map((i) => i.split(' ').map(Number));

  let start;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 2) {
        start = [i, j];
      }
    }
  }

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const visited = new Array(n).fill().map(() => new Array(m).fill(false));

  const bfs = (row, col) => {
    const queue = [[row, col, 0]];
    board[row][col] = 0;
    visited[row][col] = true;

    while (queue.length) {
      const [x, y, value] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m || board[nx][ny] !== 1 || visited[nx][ny]) continue;
        board[nx][ny] = value + 1;
        queue.push([nx, ny, value + 1]);
        visited[nx][ny] = true;
      }
    }
  };

  bfs(start[0], start[1]);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j] && board[i][j] === 1) board[i][j] = -1;
    }
  }

  console.log(board.map((i) => i.join(' ')).join('\n'));
  process.exit();
});
