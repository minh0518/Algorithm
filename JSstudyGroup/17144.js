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
  const board = data.map((row) => row.split(' ').map(Number));

  // 공기청정기 상단 위치
  let topCord;
  // 공기청정기 하단 위치
  let bottomCord;
  for (let i = 0; i < R; i++) {
    if (board[i][0] === -1) {
      topCord = i;
      bottomCord = i + 1;
      break;
    }
  }

  const spread = (board) => {
    const [dx, dy] = [
      [-1, 1, 0, 0],
      [0, 0, -1, 1],
    ];

    const spreadInfo = [];

    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        const value = board[row][col];
        if (value === -1 || value === 0) continue;

        const sparedValue = Math.floor(value / 5);
        let spreadCount = 0;

        for (let i = 0; i < 4; i++) {
          const nx = row + dx[i];
          const ny = col + dy[i];
          if (nx < 0 || nx >= R || ny < 0 || ny >= C || board[nx][ny] === -1) continue;

          spreadInfo.push([nx, ny, sparedValue]);
          spreadCount += 1;
        }
        spreadInfo.push([row, col, -(sparedValue * spreadCount)]);
      }
    }

    for (let [row, col, value] of spreadInfo) {
      board[row][col] += value;
    }
  };

  const runUpSidePurifier = (board) => {
    // 우, 상, 좌, 하 (공기청정기 순환 방향)
    let dirIndex = 0;
    const [dx, dy] = [
      [0, -1, 0, 1],
      [1, 0, -1, 0],
    ];

    // 회전이 반영된 [좌표,값]을 저장하는 배열
    const changeInfo = [];

    // 시작 좌표(공기청정기 다음좌표 부터 시작)
    let [row, col] = [topCord, 1];

    while (1) {
      let nx = row + dx[dirIndex];
      let ny = col + dy[dirIndex];

      // 현재 방향이 배열을 벗어났다면 방향을 변경
      if (nx < 0 || nx > topCord || ny < 0 || ny >= C) {
        dirIndex += 1;
        nx = row + dx[dirIndex];
        ny = col + dy[dirIndex];
      }

      // 다음 좌표가 공기청정기라면 break
      if (nx === topCord && ny === 0) break;

      // 다음좌표에 현재 좌표의 값을 반영(=배열 회전)
      changeInfo.push([nx, ny, board[row][col]]);
      row = nx;
      col = ny;
    }

    // 원본 배열에 최종 반영
    for (let [row, col, value] of changeInfo) {
      board[row][col] = value;
    }
    board[topCord][1] = 0;
  };

  const runDownSidePurifier = (board) => {
    // 우, 하, 좌, 상
    const [dx, dy] = [
      [0, 1, 0, -1],
      [1, 0, -1, 0],
    ];

    const changeInfo = [];

    let [row, col] = [bottomCord, 1];
    let dirIndex = 0;

    while (1) {
      let nx = row + dx[dirIndex];
      let ny = col + dy[dirIndex];

      if (nx < bottomCord || nx >= R || ny < 0 || ny >= C) {
        dirIndex += 1;
        nx = row + dx[dirIndex];
        ny = col + dy[dirIndex];
      }

      if (nx === bottomCord && ny === 0) break;
      changeInfo.push([nx, ny, board[row][col]]);
      row = nx;
      col = ny;
    }

    for (let [row, col, value] of changeInfo) {
      board[row][col] = value;
    }
    board[bottomCord][1] = 0;
  };

  // 메인 로직
  while (T--) {
    spread(board); // 미세먼지 전파
    runUpSidePurifier(board); // 공기청정기 상단 작동
    runDownSidePurifier(board); // 공기청정기 하단 작동
  }

  console.log(board.map((row) => row.filter((i) => i !== -1).reduce((a, b) => a + b)).reduce((a, b) => a + b));

  process.exit();
});
