// 24.3.5
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
  let [r, c, dir] = data.shift().split(' ').map(Number);
  const board = data.map((i) => {
    return i.split(' ').map(Number);
  });

  // 상 좌 하 우
  const [dx, dy] = [
    [-1, 0, 1, 0],
    [0, -1, 0, 1],
  ];

  // 북 동 남 서
  // 0  1  2  3
  const goBackward = (currentDir) => {
    if (currentDir >= 2) return currentDir - 2;
    if (currentDir < 2) return currentDir + 2;
  };

  const checkAround = (r, c, currentDir) => {
    // dxdy계산을 위해 방향 인덱스를 dxdy기준으로 변경
    if (currentDir === 1) currentDir = 3;
    else if (currentDir === 3) currentDir = 1;

    // 현재 방향 말고, 반시계 방향 90도부터 돌아가며 탐색
    for (let i = currentDir + 1; i < currentDir + 5; i++) {
      let dirIndex = i % 4;
      const nx = r + dx[dirIndex];
      const ny = c + dy[dirIndex];
      if (board[nx][ny] === 0) {
        return [nx, ny, dirIndex];
      }
    }
    return false;
  };

  let count = 0;

  while (1) {
    if (board[r][c] === 0) {
      count += 1;
      board[r][c] = 'x';
    }

    // 주변 청소 가능한 곳이 있다면 다음좌표,(dxdy기준)방향인덱스 반환
    const isAround = checkAround(r, c, dir);

    if (!isAround) {
      // isAround가 false면 기존 방향dir을 기준으로 반대방향 계산
      let nextDir = goBackward(dir);

      // nextDir을 dxdy기준으로 변경 후 좌표 이동
      if (nextDir === 1) nextDir = 3;
      else if (nextDir === 3) nextDir = 1;

      // 좌표만 변경하고 현재 dir은 유지
      const nx = r + dx[nextDir];
      const ny = c + dy[nextDir];

      if (board[nx][ny] === 1) break;

      r = nx;
      c = ny;

      continue;
    }
    if (isAround) {
      // isAround의 반환값은 dxdy기준이므로
      let [nextR, nextC, nextDir] = isAround;

      // 다시 변환
      if (nextDir === 1) nextDir = 3;
      else if (nextDir === 3) nextDir = 1;

      [r, c, dir] = [nextR, nextC, nextDir];
    }
  }

  console.log(count);

  process.exit();
});
