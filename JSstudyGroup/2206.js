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
  const board = data.map((row) => row.split('').map(Number));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  // [벽 파괴여부(0,1)][N][M]
  // 각 좌표까지의 비용
  const visited = new Array(2).fill(undefined).map(() => new Array(N).fill(undefined).map(() => new Array(M).fill(0)));

  const bfs = () => {
    let index = 0;
    const queue = [];

    // [현재 경로에서 벽 파괴 여부(0,1), 행, 열]
    queue.push([0, 0, 0]);
    // [벽을 부수지 않은][0][0] 좌표의 비용은 1
    visited[0][0][0] = 1;

    while (index < queue.length) {
      const [wallBreak, x, y] = queue[index];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

        // 다음 좌표가 벽이고, 아직 벽을 파괴히지 않았을 때
        // 벽은 1번만 파괴 가능하므로 아직 벽을 파괴하지 않은 경우는
        // 최초 방문일 수 밖에 없다.(=방문 여부 확인 할 필요x)
        if (board[nx][ny] === 1 && wallBreak === 0) {
          // 이제 현재 경로는 벽을 파괴한 적이 있는 경로가 된다
          queue.push([1, nx, ny]);

          // visited[1][nx][ny]= 벽을 파괴하지 않았던 현재 좌표 비용+1
          visited[1][nx][ny] = visited[0][x][y] + 1;
        }

        // 다음 좌표가 벽이 아니고, 아직 방문하지 않았을 때
        if (board[nx][ny] === 0 && visited[wallBreak][nx][ny] === 0) {
          // wallBreak는 유지한 체 그대로 다음 좌표로 진행
          queue.push([wallBreak, nx, ny]);
          visited[wallBreak][nx][ny] = visited[wallBreak][x][y] + 1;
        }

        // 처음 도착지점에 다다랐을 때, 비용 반환
        if (nx === N - 1 && ny === M - 1) {
          return visited[wallBreak][nx][ny];
        }
      }
      index += 1;
    }

    // 바로 -1을 반환하면 1x1의 경우 1을 반환해야 하는 부분에서 오답 발생
    // 그러므로 visited배열에서 [벽파괴여부][0][0] 둘 다 0일 때만 -1을 반환
    if (visited[0][N - 1][M - 1] === 0 && visited[1][N - 1][M - 1] === 0) return -1;
    return visited[0][N - 1][M - 1] || visited[1][N - 1][M - 1];
  };
  console.log(bfs());

  process.exit();
});
