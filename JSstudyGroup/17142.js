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

  console.log();
  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const virusCords = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const value = board[i][j];
      if (value === 1) board[i][j] = '-';
      if (value === 2) {
        board[i][j] = '*';
        virusCords.push([i, j]);
      }
    }
  }

  const simulation = (virusCord) => {
    let maxValue = 0;
    const copyBoard = JSON.parse(JSON.stringify(board));
    const queue = [];
    for (let [x, y] of virusCord) {
      queue.push([x, y, 0]);
      copyBoard[x][y] = 's';
    }

    while (queue.length) {
      const [x, y, value] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        const nextValue = value + 1;
        if (nx < 0 || nx >= N || ny < 0 || ny >= N || copyBoard[nx][ny] === '-' || copyBoard[nx][ny] === 's') continue;

        // *하고 0가 아닌 좌표(=이미 방문한 좌표)의 값이 현재 탐색비용보다 큰 경우에만(최소 비용갱신 가능) 탐색
        if (copyBoard[nx][ny] !== '*' && copyBoard[nx][ny] !== 0 && copyBoard[nx][ny] <= nextValue) {
          continue;
        }

        // * 로 이동하는 시간은 포함 x
        if (copyBoard[nx][ny] !== '*' && maxValue < nextValue) {
          maxValue = nextValue;
        }

        copyBoard[nx][ny] = nextValue;
        queue.push([nx, ny, nextValue]);
      }
    }

    return copyBoard.every((row) => row.every((col) => col !== 0)) ? maxValue : -1;
  };

  const result = [];
  // 전체 바이러스 중 M개의 조합을 도출 후 시뮬레이션
  const dfs = (current, index) => {
    if (current.length === M) {
      const totalTime = simulation(current);
      if (totalTime !== -1) result.push(totalTime);

      return;
    }
    for (let i = index; i < virusCords.length; i++) {
      current.push(virusCords[i]);
      dfs(current, i + 1);
      current.pop();
    }
  };

  dfs([], 0);

  console.log(result.length ? Math.min(...result) : -1);

  process.exit();
});
