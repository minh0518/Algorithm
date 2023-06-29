function solution(board) {
  const checkEnd = (playBoard) => {
    // 가로
    for (let rol of playBoard) {
      let width = rol.filter((i) => i !== '.');
      if (width.length === 3 && new Set(width).size === 1) {
        return true;
      }
    }

    // 세로
    for (let i = 0; i < 3; i++) {
      let height = [];
      for (let j = 0; j < 3; j++) {
        let value = playBoard[j][i];
        if (value !== '.') height.push(playBoard[j][i]);
      }
      if (height.length === 3 && new Set(height).size === 1) {
        return true;
      }
    }

    // 대각선
    let leftDown = [];
    let rightUp = [];
    for (let i = 0; i < 3; i++) {
      let leftDownValue = playBoard[i][2 - i];
      let rightUpValue = playBoard[i][i];
      if (leftDownValue !== '.') leftDown.push(playBoard[i][2 - i]);
      if (rightUpValue !== '.') rightUp.push(playBoard[i][i]);
    }
    if (leftDown.length === 3 && new Set(leftDown).size === 1) {
      return true;
    }
    if (rightUp.length === 3 && new Set(rightUp).size === 1) {
      return true;
    }

    return false;
  };

  const allCases = [];
  const dfs = (current, playBoard) => {
    allCases.push(JSON.parse(JSON.stringify(playBoard)));
    if (checkEnd(playBoard)) {
      return;
    }

    let next;
    current === 'O' ? (next = 'X') : (next = 'O');

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (playBoard[i][j] !== '.') continue;
        playBoard[i][j] = current;
        dfs(next, playBoard);
        playBoard[i][j] = '.';
      }
    }
  };

  const playBoard = new Array(3).fill().map(() => new Array(3).fill('.'));
  dfs('O', playBoard);

  let result = 0;
  for (let i of allCases) {
    let allCasesStr = i.map((i) => i.join(''));
    if (allCasesStr.join('') === board.join('')) result = 1;
  }
  console.log(result);
  return result;
}

solution(['O.X', '.O.', '..X']);
solution(['OOO', '...', 'XXX']);
solution(['...', '.X.', '...']);
solution(['...', '...', '...']);

solution(['OXX', '.O.', 'X.O']);
solution(['OXO', 'XOX', 'OXO']);
solution(['OOO', 'OOX', 'XXX']);
