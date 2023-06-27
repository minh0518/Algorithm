function solution(board) {
  board = board.map((i) => i.split(''));

  const check = () => {
    let OCount = 0;
    let XCount = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 'O') OCount += 1;
        if (board[i][j] === 'X') XCount += 1;
      }
    }
    if (!(OCount === XCount || OCount === XCount + 1)) return false;

    let OGameWinCount = 0;
    let XGameWinCount = 0;

    // 세로 확인
    for (let i = 0; i < 3; i++) {
      let OHeight = [];
      let XHeight = [];
      for (let j = 0; j < 3; j++) {
        let value = board[j][i];
        if (value === 'O') OHeight.push(value);
        if (value === 'X') XHeight.push(value);
      }
      if (OHeight.length === 3) OGameWinCount += 1;
      if (XHeight.length === 3) XGameWinCount += 1;
    }

    // 가로 확인
    for (let i = 0; i < 3; i++) {
      if (board[i].filter((i) => i === 'O').length === 3) OGameWinCount += 1;
      if (board[i].filter((i) => i === 'X').length === 3) XGameWinCount += 1;
    }

    // 크로스 확인
    let leftDownCross = [];
    let rightUpCross = [];
    for (let i = 0; i < 3; i++) {
      let value = board[i][2 - i];
      if (value !== '.') rightUpCross.push(board[i][2 - i]);
      for (let j = 0; j < 3; j++) {
        let value = board[i][j];
        if (i === j && value !== '.') leftDownCross.push(value);
      }
    }
    if (leftDownCross.length === 3 && new Set(leftDownCross).size === 1) {
      if (leftDownCross[0] === 'O') OGameWinCount += 1;
      if (leftDownCross[0] === 'X') XGameWinCount += 1;
    }
    if (rightUpCross.length === 3 && new Set(rightUpCross).size === 1) {
      if (rightUpCross[0] === 'O') OGameWinCount += 1;
      if (rightUpCross[0] === 'X') XGameWinCount += 1;
    }

    console.log(OGameWinCount);
    console.log(XGameWinCount);

    // 이긴 횟수가 같으면 안됨 (둘다 이긴적이 없어서 같은건 괜찮음)
    if (OGameWinCount !== 0 && OGameWinCount === XGameWinCount) return false;

    if (
      !(
        (OGameWinCount === 0 && XGameWinCount === 0) ||
        (OGameWinCount === 1 && XGameWinCount === 0 && OCount === XCount + 1) ||
        (OGameWinCount === 0 && XGameWinCount === 1 && OCount === XCount) ||
        //특수 케이스
        (OGameWinCount === 2 && XGameWinCount === 0 && OCount === 5 && XCount === 4)
      )
    )
      return false;

    return true;
  };

  let answer;
  check() ? (answer = 1) : (answer = 0);

  return answer;
}

solution(['O.X', '.O.', '..X']);
solution(['OOO', '...', 'XXX']);
solution(['...', '.X.', '...']);
solution(['...', '...', '...']);

solution(['OXX', '.O.', 'X.O']);
solution(['OXO', 'XOX', 'OXO']);
solution(['OOO', 'OOX', 'XXX']);
