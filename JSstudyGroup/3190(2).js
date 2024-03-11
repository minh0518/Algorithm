// 24.3.11
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
  const K = +data.shift();
  const apple = data.slice(0, K).map((i) =>
    i
      .split(' ')
      .map(Number)
      .map((i) => i - 1),
  );
  const L = +data[K];
  const dirInfo = data.slice(K + 1).map((i) =>
    i.split(' ').map((i) => {
      if (isNaN(i)) return i;
      return Number(i);
    }),
  );

  const board = new Array(N).fill().map(() => new Array(N).fill(0));

  for (let [x, y] of apple) {
    board[x][y] = 'a';
  }

  const snake = [[0, 0]];

  // 상 우 하 좌 >> 시계방향
  const [dx, dy] = [
    [-1, 0, 1, 0],
    [0, 1, 0, -1],
  ];
  let currentDirIndex = 1;

  let count = 1;
  while (1) {
    const [headX, headY] = snake[snake.length - 1];
    const nx = headX + dx[currentDirIndex];
    const ny = headY + dy[currentDirIndex];
    if (nx < 0 || nx >= N || ny < 0 || ny >= N || board[nx][ny] === 's') break;

    // 이동
    snake.push([nx, ny]); // 머리 좌표 추가
    const value = board[nx][ny];
    board[nx][ny] = 's'; // 지도에 적용
    if (value !== 'a') {
      // 사과가 없다면 꼬리부분 잘라야 함
      const [removeX, removeY] = snake.shift();
      board[removeX][removeY] = 0; //꼬리 좌표를 0으로
    }

    // 방향 정보 시간에 맞춰서 방향만 변경
    if (dirInfo.length && count === dirInfo[0][0]) {
      const [number, dir] = dirInfo.shift();
      if (dir === 'D') {
        currentDirIndex = (currentDirIndex + 1) % 4;
      }
      if (dir === 'L') {
        if (currentDirIndex === 0) currentDirIndex = 4;
        currentDirIndex -= 1;
      }
    }
    count += 1;
  }

  console.log(count);
  process.exit();
});
