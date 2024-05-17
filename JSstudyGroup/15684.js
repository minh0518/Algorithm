const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M, H] = data.shift().split(' ').map(Number);
  const lineInfo = data.map((i) => i.split(' ').map(Number));
  const board = new Array(H).fill(undefined).map(() => new Array(N).fill(0));

  if (M === 0) {
    console.log(0);
  } else {
    const [dx, dy] = [
      [0, 0],
      [-1, 1],
    ];

    for (let [a, b] of lineInfo) {
      // 행,열로 인해 -1씩 적용
      const row = a - 1;
      const col_start = b - 1;
      const col_end = b + 1 - 1;

      board[row][col_start] = 1;
      board[row][col_end] = 1;
    }

    // 1을 만났을 때, 좌 or 우로 갈지 판별
    const calcRightCord = (copyBoard, row, col) => {
      const arr = copyBoard[row];

      let oneCount = 0;
      for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        if (i === col && oneCount % 2 === 0) {
          return i + 1;
        }
        if (i === col && oneCount % 2 === 1) {
          return i - 1;
        }
        if (value === 1) oneCount += 1;
      }
    };

    // 사다리게임 시작
    const runGame = (copyBoard) => {
      for (let i = 0; i < N; i++) {
        let row = 0;
        let col = i;

        // 맨 위 ~ 맨 아래
        while (row < H) {
          const current = copyBoard[row][col];

          if (current === 1) {
            const moveCandidates = [];
            for (let i = 0; i < 2; i++) {
              const nx = row + dx[i];
              const ny = col + dy[i];
              if (nx < 0 || nx >= H || ny < 0 || ny >= N || copyBoard[nx][ny] === 0) continue;
              moveCandidates.push(ny);
            }

            // 양 옆에 1이 1개라면 거기로 이동
            if (moveCandidates.length === 1) {
              col = moveCandidates[0];
            }

            // 양 옆에 1이 2개라면 calcRightCord로 판별 후 이동
            if (moveCandidates.length !== 1) {
              col = calcRightCord(copyBoard, row, col);
            }
          }

          row += 1;
        }

        // i번 세로선의 결과가 i번이 아니라면 false
        if (i !== col) return false;
      }
      // 모든 i번 세로선의 결과가 i번 이라면 true
      return true;
    };

    // 백트래킹
    const dfs = (row, col, currentCount, targetLength, copyBoard) => {
      if (currentCount === targetLength) {
        const result = runGame(copyBoard);
        return result;
      }

      // 이전 재귀 좌표에 이어서 탐색 진행
      for (let i = row; i < H; i++) {
        let j = i === row ? col : 0;
        for (j; j < N - 1; j++) {
          const col_start = copyBoard[i][j];
          const col_end = copyBoard[i][j + 1];
          // 둘 다 0인 자리에만 사다리를 놓을 수 있음
          if (col_start === 1 || col_end === 1) continue;
          copyBoard[i][j] = 1;
          copyBoard[i][j + 1] = 1;
          if (dfs(i, j + 1, currentCount + 1, targetLength, copyBoard)) return true;
          copyBoard[i][j] = 0;
          copyBoard[i][j + 1] = 0;
        }
      }
    };

    let result;

    // 사다리를 추가할 필요가 없을 수도 있으므로 0부터 시작
    for (let ladderCount = 0; ladderCount <= 3; ladderCount++) {
      const copyBoard = JSON.parse(JSON.stringify(board));
      const isPossible = dfs(0, 0, 0, ladderCount, copyBoard);

      if (isPossible) {
        result = ladderCount;
        break;
      }
    }
    console.log(result === undefined ? -1 : result);
  }

  process.exit();
});
