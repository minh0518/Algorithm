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
  const board = new Array(N).fill(undefined).map(() => new Array(M).fill(0));

  const findPossibleLocation = (R, C, sticker) => {
    const stickerFlat = sticker.flat();
    for (let i = 0; i <= N - R; i++) {
      for (let j = 0; j <= M - C; j++) {
        const currentArea = board
          .slice(i, i + R)
          .map((row) => row.slice(j, j + C))
          .flat();

        if (currentArea.every((value, index) => value === 0 || (value === 1 && stickerFlat[index] === 0))) {
          for (let row = i; row < i + R; row++) {
            for (let col = j; col < j + C; col++) {
              if (board[row][col] === 0) board[row][col] = sticker[row - i][col - j];
            }
          }
          return true;
        }
      }
    }
    return false;
  };

  const rotate = (R, C, sticker, index) => {
    // 0: 90, 1:180, 2:270

    if (index === 0) {
      const rotate90 = new Array(C).fill(undefined).map(() => new Array(R).fill(0));
      for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
          rotate90[j][R - 1 - i] = sticker[i][j];
        }
      }
      return rotate90;
    }
    if (index === 1) {
      const rotate180 = new Array(R).fill(undefined).map(() => new Array(C).fill(0));
      for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
          rotate180[R - 1 - i][C - 1 - j] = sticker[i][j];
        }
      }
      return rotate180;
    }
    if (index === 2) {
      const rotate270 = new Array(C).fill(undefined).map(() => new Array(R).fill(0));
      for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
          rotate270[C - 1 - j][i] = sticker[i][j];
        }
      }
      return rotate270;
    }
  };

  let index = 0;
  while (K--) {
    const [R, C] = data[index].split(' ').map(Number);
    const sticker = data.slice(index + 1, index + 1 + R).map((i) => i.split(' ').map(Number));

    const isAttach = findPossibleLocation(R, C, sticker);

    if (!isAttach) {
      for (let i = 0; i < 3; i++) {
        const rotatedSticker = rotate(R, C, sticker, i);

        const isAttach = findPossibleLocation(rotatedSticker.length, rotatedSticker[0].length, rotatedSticker);
        if (isAttach) {
          break;
        }
      }
    }

    index += R + 1;
  }
  console.log(board.map((row) => row.filter((col) => col === 1).length).reduce((a, b) => a + b));

  process.exit();
});
