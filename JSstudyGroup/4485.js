const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let index = 0;

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const result = [];

  const bfs = (board, N) => {
    // 최소비용을 담는 배열
    const dp = new Array(N).fill(undefined).map(() => new Array(N).fill(Infinity));
    // 시작 비용 초기화
    dp[0][0] = board[0][0];

    const queue = [];
    queue.push([0, 0]);
    while (queue.length) {
      // 행,열
      const [x, y] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

        const nextValue = dp[x][y] + board[nx][ny];

        // 현재 경로로 방문한 좌표가 최소비용이라면 갱신
        if (nextValue >= dp[nx][ny]) continue;
        dp[nx][ny] = nextValue;
        queue.push([nx, ny]);
      }
    }

    return dp[N - 1][N - 1];
  };

  // 메인 로직
  while (1) {
    const N = +data[index];
    if (N === 0) break;
    const board = data.slice(index + 1, index + 1 + N).map((row) => row.split(' ').map(Number));

    const value = bfs(board, N);
    result.push(`Problem ${result.length + 1}: ${value}`);

    index += N + 1;
  }
  console.log(result.join('\n'));

  process.exit();
});
