const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();
  let totalCount = +data.shift();
  let recommend = data.shift().split(' ').map(Number);

  let board = []; // [학생번호 , 추천 횟수]

  const getMin = (arr) => {
    return Math.min(...arr.map((i) => i[1]));
  };

  for (let i = 0; i < totalCount; i++) {
    let existFlag = false;
    for (let j = 0; j < board.length; j++) {
      if (board[j][0] === recommend[i]) {
        board[j][1] += 1;
        existFlag = true;
        break;
      }
    }

    if (!existFlag) {
      if (board.length >= N) {
        let min = getMin(board);
        for (let j = 0; j < board.length; j++) {
          if (board[j][1] === min) {
            board.splice(j, 1);
             //board에  계속 push하는 방식이므로, 앞에있는 것이 가장 오래된 것이다
             //그러므로 앞에서부터 삭제하면 가장 오래된 것을 삭제하는 것이 된다
            board.push([recommend[i], 1]);
            break;
          }
        }
      } else {
        board.push([recommend[i], 1]);
      }
    }
  }

  let answer = [];
  for (let i of board) {
    answer.push(i[0]);
  }

  console.log(answer.sort((a, b) => a - b).join(' '));
  process.exit();
});
