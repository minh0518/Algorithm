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

  const bfs = (hospitals, current) => {
    const copyBoard = JSON.parse(JSON.stringify(board));
    const queue = [];
    for (let index of current) {
      const cord = hospitals[index];
      copyBoard[cord[0]][cord[1]] = 's';
      queue.push([...cord, 0]);
    }
    const rest = hospitals.filter((_, index) => !current.includes(index));

    while (queue.length) {
      const [x, y, value] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (
          nx < 0 ||
          nx >= N ||
          ny < 0 ||
          ny >= N ||
          copyBoard[nx][ny] === 'x' ||
          copyBoard[nx][ny] === 's' ||
          copyBoard[nx][ny] > 0
        )
          continue;

        copyBoard[nx][ny] = value + 1;
        queue.push([nx, ny, value + 1]);
      }
    }

    for (let [x, y] of rest) {
      copyBoard[x][y] = 'x';
    }

    let maxValue = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const value = copyBoard[i][j];
        if (value === 0) return false;
        if (!isNaN(value) && maxValue < value) maxValue = value;
      }
    }
    return maxValue;
  };

  let minValue = Infinity;
  const dfs = (current, index, hospitals) => {
    if (current.length === M) {
      const value = bfs(hospitals, current);

      if (value !== false && minValue > value) minValue = value;
      return;
    }

    for (let i = index; i < hospitals.length; i++) {
      current.push(i);
      dfs(current, i + 1, hospitals);
      current.pop();
    }
  };

  const hospitals = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const value = board[i][j];
      if (value === 2) {
        board[i][j] = 0;
        hospitals.push([i, j]);
      }
      if (value === 1) board[i][j] = 'x';
    }
  }

  dfs([], 0, hospitals);
  console.log(minValue === Infinity ? -1 : minValue);

  process.exit();
});
