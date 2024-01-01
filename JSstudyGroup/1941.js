const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const BOARD_LENGTH = 5;

  const board = data.map((i) => i.split(''));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  let rseult = 0;

  // 0~24
  const convertBoardIndex = (targetNum) => {
    const row = Math.floor(targetNum / BOARD_LENGTH);
    const col = targetNum % BOARD_LENGTH;

    return [row, col];
  };

  const checkExistIndex = (indexArr, targetX, targetY) => {
    for (let j = 0; j < indexArr.length; j++) {
      if (indexArr[j].join('') === [targetX, targetY].join('')) return true;
    }
    return false;
  };

  // 7개의 좌표 배열 indexArr들이
  // 서로 연결 돼 있는지 확인하는 함수(백트래킹x, 일반 재귀 그래프탐색)
  const dfsForCheckLinked = (x, y, indexArr, traceLog) => {
    // 방문
    traceLog.push([x, y].join(''));

    if (traceLog.length === indexArr.length) {
      return true;
    }

    // 현재 좌표에서 상하좌우 인접한 부분의 좌표를 구하고,
    // 이게 indexArr에 포함되어 있는 좌표라면 탐색을 진행
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // 현재 좌표에 인접한 nx,ny가
      // !(범위 안에 있고 && 방문했던 좌표가 아니고 &&  7개의 좌표 배열에 속한 좌표) continue
      if (
        nx < 0 ||
        nx >= BOARD_LENGTH ||
        ny < 0 ||
        ny >= BOARD_LENGTH ||
        traceLog.includes([nx, ny].join('')) ||
        !checkExistIndex(indexArr, nx, ny)
      )
        continue;

      if (dfsForCheckLinked(nx, ny, indexArr, traceLog)) return true;
    }
  };

  // 길이가 7인 좌표의 조합을 구하는 백트래킹 함수
  const dfs = (current, index) => {
    if (current.length === 7) {
      const indexArr = [];
      let S = 0;
      let Y = 0;
      for (let i of current) {
        const [rol, col] = convertBoardIndex(i);
        indexArr.push([rol, col]);
        if (board[rol][col] === 'S') {
          S += 1;
        }
        if (board[rol][col] === 'Y') {
          Y += 1;
        }

        if (Y >= 4) return;
      }

      const res = dfsForCheckLinked(indexArr[0][0], indexArr[0][1], indexArr, [], 1);
      if (res) rseult += 1;

      return;
    }

    for (let i = index; i < 25; i++) {
      current.push(i);
      dfs(current, i + 1);
      current.pop();
    }
  };

  dfs([], 0);

  console.log(rseult);

  process.exit();
});
