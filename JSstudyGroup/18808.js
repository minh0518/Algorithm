const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M, K] = data.shift().split(' ').map(Number);

  const rotate = (arr, degree) => {
    if (degree === 0) return arr;
    const ROW = arr.length;
    const COL = arr[0].length;

    let newArr;
    if (degree === 1 || degree === 3) newArr = new Array(COL).fill(undefined).map(() => new Array(ROW).fill(0));
    if (degree === 2) newArr = new Array(ROW).fill(undefined).map(() => new Array(COL).fill(0));

    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
        let nx, ny;

        // 90도
        if (degree === 1) {
          nx = j;
          ny = ROW - 1 - i;
        }

        // 180도
        if (degree === 2) {
          nx = ROW - 1 - i;
          ny = COL - 1 - j;
        }

        // 270도
        if (degree === 3) {
          nx = COL - 1 - j;
          ny = i;
        }

        newArr[nx][ny] = arr[i][j];
      }
    }

    return newArr;
  };

  const checkPossible = (board, x, y, target, targetRow, targetCol) => {
    const endRow = x + targetRow;
    const endCol = y + targetCol;

    if (endRow < 0 || endRow > N || endCol < 0 || endCol > M) return false;
    for (let i = x; i < endRow; i++) {
      for (let j = y; j < endCol; j++) {
        if (board[i][j] === 1 && target[i - x][j - y] === 1) return false;
      }
    }
    return true;
  };

  const paint = (board, x, y, target, targetRow, targetCol) => {
    const endRow = x + targetRow;
    const endCol = y + targetCol;

    for (let i = x; i < endRow; i++) {
      for (let j = y; j < endCol; j++) {
        if (target[i - x][j - y] === 1) board[i][j] = 1;
      }
    }
  };

  const main = (board, info, N, M) => {
    for (let dir = 0; dir < 4; dir++) {
      const currentRotate = rotate(info, dir);

      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          const isPossible = checkPossible(board, i, j, currentRotate, currentRotate.length, currentRotate[0].length);

          if (isPossible) {
            paint(board, i, j, currentRotate, currentRotate.length, currentRotate[0].length);
            return;
          }
        }
      }
    }
  };

  const board = new Array(N).fill(undefined).map(() => new Array(M).fill(0));
  let index = 0;
  while (K--) {
    const [R, C] = data[index].split(' ').map(Number);
    const info = data.slice(index + 1, index + 1 + R).map((row) => row.split(' ').map(Number));

    main(board, info, N, M);
    index += R + 1;
  }
  console.log(board.map((row) => row.filter((i) => i === 1).length).reduce((a, b) => a + b));

  process.exit();
});
