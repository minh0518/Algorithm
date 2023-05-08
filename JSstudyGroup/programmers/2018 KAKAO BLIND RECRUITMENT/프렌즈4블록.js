const solution = (m, n, board) => {
  board = board.map((i) => i.split(''));

  while (1) {
    let scoreFlag = false;
    let same = [];
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (
          board[i][j] !== 0 &&
          board[i][j] === board[i][j + 1] &&
          board[i][j + 1] === board[i + 1][j + 1] &&
          board[i + 1][j + 1] === board[i + 1][j]
        ) {
          scoreFlag = true;
          same.push([i, j]);
        }
      }
    }

    // 0을 못 찾았다면 while문 탈출 후 정답 출력
    if (!scoreFlag) {
      break;
    }

    same.forEach((i) => {
      let [x, y] = i;
      board[x][y] = 0;
      board[x][y + 1] = 0;
      board[x + 1][y + 1] = 0;
      board[x + 1][y] = 0;
    });

    for (let i = m - 1; i >= 0; i--) {
      if (board[i].join('').includes('0')) {
        // 0이 포함된 행이라면
        for (let j = 0; j < n; j++) {
          if (board[i][j] === 0) {
            let x = i;
            while (x > 0) {
              // [1]까지만 탐색
              if (board[x][j] !== 0) break;
              x -= 1;
            }

            // swap
            [[board[i][j]], [board[x][j]]] = [[board[x][j]], [board[i][j]]];
          }
        }
      }
    }
  }

  console.log(board);

  let answer = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 0) answer += 1;
    }
  }

  console.log(answer);
  return answer;
};

solution(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']);
solution(6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ']);
