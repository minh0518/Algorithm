const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M, x, y, K] = data.shift().split(' ').map(Number);
  const command = data.pop().split(' ').map(Number);
  const board = data.map((i) => i.split(' ').map(Number));

  // 동 서 북 남
  const [dx, dy] = [
    [0, 0, -1, 1],
    [1, -1, 0, 0],
  ];

  // 전역으로 사용하는 주사위
  const dice = new Array(6).fill(0);
  const DOWN_SIDE_INDEX = 2;
  const UP_SIDE_INDEX = 5;

  const moveDice = (dir) => {
    // 동
    if (dir === 0) {
      [dice[5], dice[1], dice[2], dice[3]] = [dice[1], dice[2], dice[3], dice[5]];
    }
    // 서
    if (dir === 1) {
      [dice[2], dice[3], dice[5], dice[1]] = [dice[1], dice[2], dice[3], dice[5]];
    }
    // 북
    if (dir === 2) {
      [dice[2], dice[4], dice[5], dice[0]] = [dice[0], dice[2], dice[4], dice[5]];
    }
    // 남
    if (dir === 3) {
      [dice[5], dice[0], dice[2], dice[4]] = [dice[0], dice[2], dice[4], dice[5]];
    }
  };

  const result = [];

  const dfs = (index, x, y) => {
    // K번 수행하면 바로 종료
    if (index === K) {
      return true;
    }

    const nextDirIndex = command[index] - 1;

    const nx = x + dx[nextDirIndex];
    const ny = y + dy[nextDirIndex];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
      if (dfs(index + 1, x, y)) return true;
    } else {
      // 다음 좌표 이동 + 주사위와 지도의 동작 수행
      moveDice(nextDirIndex);
      const downValue = dice[DOWN_SIDE_INDEX];
      const upValue = dice[UP_SIDE_INDEX];
      result.push(upValue);

      if (board[nx][ny] === 0) {
        board[nx][ny] = downValue;
      } else if (board[nx][ny] !== 0) {
        dice[2] = board[nx][ny];
        board[nx][ny] = 0;
      }

      if (dfs(index + 1, nx, ny)) return true;
    }
  };

  dfs(0, x, y);

  console.log(result.join('\n'));

  process.exit();
});
