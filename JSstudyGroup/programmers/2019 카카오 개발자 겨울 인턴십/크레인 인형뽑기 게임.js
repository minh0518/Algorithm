function solution(board, moves) {
  let stack = [];
  let result = 0;
  for (let i of moves) {
    for (let j = 0; j < board.length; j++) {
      let doll = board[j][i - 1];
      if (doll) {
        board[j][i - 1] = 0;
        if (stack[stack.length - 1] === doll) {
          result += 2;
          stack.splice(stack.length - 1);
        } else {
          stack.push(doll);
        }
        break;
      }
    }
    // if (stack[stack.length - 1] === stack[stack.length - 2]) {
    //   result += 2;
    //   stack.splice(stack.length - 2);
    // }
  }

  return result;
}

solution(
  [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ],
  [1, 5, 3, 5, 1, 2, 1, 4],
);
