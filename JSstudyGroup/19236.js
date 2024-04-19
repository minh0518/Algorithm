const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let board = data.map((i) => i.split(' ').map(Number));
  board = board.map((row) => {
    const newRow = [];
    for (let i = 0; i < row.length; i += 2) {
      const [f, d] = row.slice(i, i + 2);
      newRow.push({ f, d: d - 1 });
    }
    return newRow;
  });
  const startAcc = board[0][0].f;
  board[0][0] = { f: 's', d: board[0][0].d };

  const [dx, dy] = [
    [-1, -1, 0, 1, 1, 1, 0, -1],
    [0, -1, -1, -1, 0, 1, 1, 1],
  ];

  const move = (board) => {
    const copyBoard = JSON.parse(JSON.stringify(board));
    const flowInfo = new Array(17).fill(undefined).map(() => []);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const value = copyBoard[i][j];
        if (value === 'x' || value.f === 's') continue;
        flowInfo[value.f] = [i, j];
      }
    }

    let index = 1;
    while (index < flowInfo.length) {
      if (flowInfo[index].length) {
        const [x, y] = flowInfo[index];
        const currentFish = copyBoard[x][y];

        // 이동할 수 있는 곳이 나올때까지 반시계 방향으로 이동
        for (let i = currentFish.d; i < currentFish.d + 8; i++) {
          const currentDir = i % 8;
          const nx = x + dx[currentDir];
          const ny = y + dy[currentDir];

          // 구역을 벗어나거나, 상어가 있는 곳으로는 이동하지 않음
          if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4 || copyBoard[nx][ny].f === 's') continue;

          // 물고기가 이동 가능할때만 방향을 옮기는듯?
          currentFish.d = currentDir;

          // flowInfo의 내용도 같이 변경해 줘야 한다
          [flowInfo[index], flowInfo[copyBoard[nx][ny].f]] = [flowInfo[copyBoard[nx][ny].f], flowInfo[index]];
          // 물고기 위치 이동
          [copyBoard[x][y], copyBoard[nx][ny]] = [copyBoard[nx][ny], copyBoard[x][y]];
          break;
        }
      }
      index += 1;
    }
    return copyBoard;
  };

  const result = [];

  const dfs = (currentBoard, acc) => {
    // 상어는 기존 위치에 있고
    // 물고기가 움직인 다음에
    // 상어 좌표에 대한 백트래킹

    const movedBoard = move(currentBoard);

    let sharkCord;
    let sharkDir;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const value = movedBoard[i][j];
        if (value === 'x') continue;
        if (value.f === 's') {
          sharkCord = [i, j];
          sharkDir = value.d;
        }
      }
    }

    const nextSharkCords = [];

    let [currentSharkX, currentSharkY] = sharkCord;

    while (1) {
      const nx = currentSharkX + dx[sharkDir];
      const ny = currentSharkY + dy[sharkDir];
      if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) break;

      if (movedBoard[nx][ny] !== 'x') {
        nextSharkCords.push([nx, ny]);
      }
      currentSharkX = nx;
      currentSharkY = ny;
    }

    if (!nextSharkCords.length) {
      result.push(acc);
      return;
    }

    for (let [nextSharkX, nextSharkY] of nextSharkCords) {
      const originShark = { ...movedBoard[sharkCord[0]][sharkCord[1]] };
      const originFish = { ...movedBoard[nextSharkX][nextSharkY] };

      // 현재 상어가 있던 곳은 빈 칸 처리
      movedBoard[sharkCord[0]][sharkCord[1]] = 'x';
      // 다음 상어의 위치 지정
      movedBoard[nextSharkX][nextSharkY].f = 's';

      dfs(movedBoard, acc + originFish.f);

      // 원상 복구
      movedBoard[sharkCord[0]][sharkCord[1]] = { ...originShark };
      movedBoard[nextSharkX][nextSharkY] = { ...originFish };
    }
  };

  // 누적값을 0부터 시작하지 않고, [0,0]의 물고기 번호를 먹은 뒤의 값부터 시작한다
  dfs(board, startAcc);

  console.log(Math.max(...result));

  process.exit();
});
