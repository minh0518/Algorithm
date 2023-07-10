function solution(board, skill) {
  const rows = board.length;
  const cols = board[0].length;
  const prefixSumBoard = new Array(rows + 1).fill().map(() => new Array(cols + 1).fill(0));

  for (let i of skill) {
    let type = i[0];
    let [from, to] = [
      [i[1], i[2]],
      [i[3], i[4]],
    ];
    let degree = type === 1 ? -i[5] : i[5];

    // 시작 좌표
    prefixSumBoard[from[0]][from[1]] += degree;

    // 오른쪽
    prefixSumBoard[from[0]][to[1] + 1] += -degree;

    // 아래쪽
    prefixSumBoard[to[0] + 1][from[1]] += -degree;

    // 우측 하단
    prefixSumBoard[to[0] + 1][to[1] + 1] += degree;
  }

  // 위에서 아래로 누적합
  // prefixSumBoard는 기존 행,열에서 각각 +1을 한 것이므로 <가 아닌 <=로 해야 함
  for (let i = 0; i <= cols; i++) {
    for (let j = 1; j <= rols; j++) {
      prefixSumBoard[j][i] = prefixSumBoard[j - 1][i] + prefixSumBoard[j][i];
    }
  }
  console.log(prefixSumBoard);

  //왼쪽에서 오른쪽으로 누적합
  for (let i = 0; i <= rols; i++) {
    for (let j = 1; j <= cols; j++) {
      prefixSumBoard[i][j] = prefixSumBoard[i][j - 1] + prefixSumBoard[i][j];
    }
  }

  // 최종적으로 board와 합침
  for (let i = 0; i < rols; i++) {
    for (let j = 0; j < cols; j++) {
      board[i][j] += prefixSumBoard[i][j];
    }
  }

  console.log(board);

  // 최종 갯수 카운트
  let result = 0;
  for (let i = 0; i < rols; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] > 0) result += 1;
    }
  }
  return result;
}
