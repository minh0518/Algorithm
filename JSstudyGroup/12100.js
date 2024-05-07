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

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const move = (currentBoard, dirIndex) => {
    const visited = new Array(N).fill(undefined).map(() => new Array(N).fill(false));

    // 이동 방향 : 상, 좌 (0열, 0행부터 탐색하며 이동)
    if (dirIndex === 0 || dirIndex === 2) {
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const originValue = currentBoard[i][j];
          if (originValue === 0) continue;

          // 움직이고 난 다음에 0이 되어야 하므로
          // 현재 좌표는 미리 0으로 세팅
          // (움직이지 못하더라도 나중에 다시 채우면 됨)
          currentBoard[i][j] = 0;

          let row = i;
          let col = j;
          while (1) {
            const nx = row + dx[dirIndex];
            const ny = col + dy[dirIndex];

            // 블록의 좌표를 찾다가 범위를 벗어나면 직전 좌표에 할당
            if (nx < 0 || nx >= N || ny < 0 || ny >= N) {
              currentBoard[row][col] = originValue;
              break;
            }

            // 0 말고 다른 값이 나올때까지 이동
            const nextCordValue = currentBoard[nx][ny];
            if (nextCordValue === 0) {
              row = nx;
              col = ny;
              continue;
            }

            // 값이 같고, 한번도 합쳐지지 않았다면 합체
            if (nextCordValue === originValue && !visited[nx][ny]) {
              currentBoard[nx][ny] = originValue * 2;
              visited[nx][ny] = true;
            }
            // 값이 서로 다르거나, 같더라도 이미 합체가 됐었다면 기존값 사용
            else if (nextCordValue !== originValue || visited[nx][ny]) {
              // 하나로 합칠 수 없으니까 현재 탐색중인 nx,ny가 아닌
              // 직전좌표인 row,col에 할당
              currentBoard[row][col] = originValue;
            }

            break;
          }
        }
      }
    }

    // 이동 방향 : 하, 우 (N열, N행부터 탐색하며 이동)
    if (dirIndex === 1 || dirIndex === 3) {
      for (let i = N - 1; i >= 0; i--) {
        for (let j = N - 1; j >= 0; j--) {
          const originValue = currentBoard[i][j];
          if (originValue === 0) continue;

          // 미리 제거
          currentBoard[i][j] = 0;

          let row = i;
          let col = j;
          while (1) {
            const nx = row + dx[dirIndex];
            const ny = col + dy[dirIndex];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) {
              currentBoard[row][col] = originValue;
              break;
            }

            const nextCordValue = currentBoard[nx][ny];
            if (nextCordValue === 0) {
              row = nx;
              col = ny;
              continue;
            }

            if (nextCordValue === originValue && !visited[nx][ny]) {
              currentBoard[nx][ny] = originValue * 2;
              visited[nx][ny] = true;
            } else if (nextCordValue !== originValue || visited[nx][ny]) {
              currentBoard[row][col] = originValue;
            }

            break;
          }
        }
      }
    }
  };

  let maxValue = 0;
  const dfs = (currentBoard, moveCount) => {
    if (moveCount === 5) {
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const value = currentBoard[i][j];
          if (value === 0) continue;
          if (value > maxValue) {
            maxValue = value;
          }
        }
      }
      return;
    }

    for (let i = 0; i < 4; i++) {
      const copyBoard = JSON.parse(JSON.stringify(currentBoard));
      move(copyBoard, i); // copyBoard원본에 대해 블록 이동 적용
      dfs(copyBoard, moveCount + 1);
      // 매 for문마다 deepCopy가 진행되므로 백트래킹의 원상복구를 할 필요x
    }
  };

  dfs(board, 0);
  console.log(maxValue);

  process.exit();
});
