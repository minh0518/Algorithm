// 24.3.7
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();
  const board = data.map((i) => i.split(' ').map(Number));

  let cord;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const value = board[i][j];
      if (value === 9) {
        board[i][j] = 'x';
        cord = [i, j];
        i = N;
        break;
      }
    }
  }

  // 상 좌 하 우
  const [dx, dy] = [
    [-1, 0, 1, 0],
    [0, -1, 0, 1],
  ];

  const bfs = (startX, startY, currentSize) => {
    const queue = [];
    queue.push([startX, startY, 0]);
    const visited = new Array(N).fill().map(() => new Array(N).fill(false));
    visited[startX][startY] = true;

    let result;
    while (queue.length) {
      const [x, y, distance] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (
          nx < 0 ||
          nx >= N ||
          ny < 0 ||
          ny >= N ||
          visited[nx][ny] ||
          board[nx][ny] > currentSize ||
          board[nx][ny] === 'x'
        )
          continue;
        const fish = board[nx][ny];
        // 먹을 수 있는 물고기의 좌표에 도달했을 때
        if (fish !== 0 && fish < currentSize) {
          // 최초 좌표라면 result에 저장
          if (!result) {
            result = [nx, ny, distance + 1];
          }
          // 거리가 더 가까운 곳이라면 갱신
          if (result && result[2] > distance + 1) {
            result = [nx, ny, distance + 1];
          }
          // 거리가 동일한데 더 위에 있는 곳이라면 갱신
          if (result[2] === distance + 1 && nx < result[0]) {
            result = [nx, ny, distance + 1];
          }
          // 거리와 x좌표가 동일한데 더 왼쪽에 있는 곳이라면 갱신
          else if (result[2] === distance + 1 && nx === result[0] && result[1] > ny) {
            result = [nx, ny, distance + 1];
          }
        }
        queue.push([nx, ny, distance + 1]);
        visited[nx][ny] = true;
      }
    }
    return result;
  };

  let size = 2;
  let eatCount = 0;
  let count = 0;

  while (1) {
    const [currentX, currentY] = cord;

    const result = bfs(currentX, currentY, size);

    if (!result) break;

    const [nx, ny, distance] = result;

    board[currentX][currentY] = 0;
    board[nx][ny] = 'x';
    cord = [nx, ny];
    count += distance;
    eatCount += 1;
    if (eatCount === size) {
      eatCount = 0;
      size += 1;
    }
  }
  console.log(count);

  process.exit();
});
