const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [R, C, T] = data.shift().split(' ').map(Number);
  const board = data.map((i) => i.split(' ').map(Number));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const getDustCord = () => {
    const dustCord = [];
    const machineCord = [];
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        const value = board[i][j];
        if (value !== 0 && value !== -1) dustCord.push([i, j]);
        if (value === -1) machineCord.push([i, j]);
      }
    }

    return [dustCord, machineCord];
  };

  let upDirIndex = 0;
  const [upDx, upDy] = [
    [0, -1, 0, 1],
    [1, 0, -1, 0],
  ];
  let downDirIndex = 0;
  const [downDx, downDy] = [
    [0, 1, 0, -1],
    [1, 0, -1, 0],
  ];
  while (T--) {
    const [dustCord, machineCord] = getDustCord();
    const calcInfoMap = new Map();
    for (let [x, y] of dustCord) {
      let currentDust = board[x][y];
      let spreadDust = Math.floor(currentDust / 5);
      let spreadCount = 0;
      const currentCordStr = `[${x},${y}]`;
      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        if (nx < 0 || nx >= R || ny < 0 || ny >= C || board[nx][ny] === -1) continue;
        spreadCount += 1;
        const nextCordStr = `[${nx},${ny}]`;
        calcInfoMap.set(
          nextCordStr,
          calcInfoMap.has(nextCordStr) ? calcInfoMap.get(nextCordStr) + spreadDust : spreadDust,
        );
      }
      const mius = -(spreadCount * spreadDust);
      calcInfoMap.set(currentCordStr, calcInfoMap.has(currentCordStr) ? calcInfoMap.get(currentCordStr) + mius : mius);
    }

    for (let [key, value] of [...calcInfoMap]) {
      const [x, y] = JSON.parse(key).map(Number);
      board[x][y] += value;
    }

    const goUpMap = new Map();
    let [upX, upY] = machineCord[0];

    while (1) {
      let currentValue = board[upX][upY];
      if (currentValue === -1) currentValue = 0;

      let nx = upX + upDx[upDirIndex];
      let ny = upY + upDy[upDirIndex];
      if (nx < 0 || nx > R || ny < 0 || ny >= C) {
        upDirIndex = (upDirIndex + 1) % 4;
        nx = upX + upDx[upDirIndex];
        ny = upY + upDy[upDirIndex];
      }
      if (nx === machineCord[0][0] && ny === machineCord[0][1]) {
        upDirIndex = 0;
        break;
      }
      goUpMap.set([nx, ny], currentValue);
      upX = nx;
      upY = ny;
    }

    const goDownMap = new Map();
    let [downX, downY] = machineCord[1];
    while (1) {
      let currentValue = board[downX][downY];
      if (currentValue === -1) currentValue = 0;

      let nx = downX + downDx[downDirIndex];
      let ny = downY + downDy[downDirIndex];
      if (nx < 0 || nx >= R || ny < 0 || ny >= C) {
        downDirIndex = (downDirIndex + 1) % 4;
        nx = downX + downDx[downDirIndex];
        ny = downY + downDy[downDirIndex];
      }
      if (nx === machineCord[1][0] && ny === machineCord[1][1]) {
        downDirIndex = 0;
        break;
      }
      goDownMap.set([nx, ny], currentValue);
      downX = nx;
      downY = ny;
    }

    for (let [key, value] of goUpMap) {
      const [x, y] = key;
      board[x][y] = value;
    }
    for (let [key, value] of goDownMap) {
      const [x, y] = key;
      board[x][y] = value;
    }
  }
  console.log(board.map((i) => i.reduce((a, b) => a + b)).reduce((a, b) => a + b) + 2);

  process.exit();
});
