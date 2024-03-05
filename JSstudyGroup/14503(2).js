// 24.3.6
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

  // 상 우 하 좌
  const [dx, dy] = [
    [-1, 0, 1, 0],
    [0, 1, 0, -1],
  ];

  const getBackwardDir = (currentDir) => {
    if (currentDir >= 2) return currentDir - 2;
    if (currentDir < 2) return currentDir + 2;
  };
  const queue = [];
  queue.push([r, c, dir]);

  let count = 0;
  while (queue.length) {
    const [currentR, currentC, currentDir] = queue.shift();

    if (board[currentR][currentC] === 0) {
      board[currentR][currentC] = 'x';
      count += 1;
    }
    let currentDirCopy = currentDir;

    let moveFlag = false;
    // dx,dy 인덱스를 거꾸로 탐색
    for (let i = 0; i < 4; i++) {
      currentDirCopy -= 1; // 90도 먼저 회전
      if (currentDirCopy < 0) currentDirCopy = 3;
      const currentDirIndex = currentDirCopy;
      const nx = currentR + dx[currentDirIndex];
      const ny = currentC + dy[currentDirIndex];
      if (board[nx][ny] === 0) {
        moveFlag = true;
        queue.push([nx, ny, currentDirIndex]);
        break;
      }
    }
    if (!moveFlag) {
      // 뒤로 이동
      const backwardDir = getBackwardDir(currentDir);
      const nx = currentR + dx[backwardDir];
      const ny = currentC + dy[backwardDir];
      if (board[nx][ny] === 1) break;
      queue.push([nx, ny, currentDir]);
    }
  }
  console.log(count);

  process.exit();
});
