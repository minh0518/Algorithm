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
  let [x, y, dir] = data.shift().split(' ').map(Number);
  const board = data.map((row) => row.split(' ').map(Number));

  // 북 동 남 서
  const [dx, dy] = [
    [-1, 0, 1, 0],
    [0, 1, 0, -1],
  ];

  // 방향은 유지한 체, 뒤로 이동
  const goBack = (x, y, dir) => {
    if (dir < 2) dir += 2;
    else if (dir >= 2) dir -= 2;
    return [x + dx[dir], y + dy[dir]];
  };

  // 메인 로직
  let count = 0;
  while (1) {
    // 현재 좌표 청소
    if (board[x][y] === 0) {
      board[x][y] = 'x';
      count += 1;
    }

    let isMoved = false; // 주변에 빈 공간이 있는지에 대한 여부
    let copyDir = dir; // 현재 방향 복사 (주변에 빈 공간이 있다면 이 방향을 사용)

    // 4방향 회전하면서 빈 공간 탐색
    for (let i = 0; i < 4; i++) {
      copyDir -= 1; // 반시계 방향으로 회전이 먼저
      if (copyDir === -1) copyDir = 3;

      const nx = x + dx[copyDir];
      const ny = y + dy[copyDir];
      // 빈 공간이 있다면 copyDir 방향, 좌표대로 이동
      if (board[nx][ny] === 0) {
        x = nx;
        y = ny;
        dir = copyDir;
        isMoved = true;
        break;
      }
    }

    // 빈 공간이 없다면 후진
    if (!isMoved) {
      const [nx, ny] = goBack(x, y, dir);
      if (board[nx][ny] === 1) break; // while문 탈출
      if (board[nx][ny] === 'x') {
        x = nx;
        y = ny;
      }
      continue;
    }
  }

  console.log(count);

  process.exit();
});
