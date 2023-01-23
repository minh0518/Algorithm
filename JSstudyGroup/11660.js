const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number);

  let board = data.slice(0, N).map((i) => i.split(' ').map(Number));

  let cords = data.slice(N).map((i) => i.split(' ').map(Number));

  const makeSumBoard = () => {
    // sumBoard를 구할땐 이전 행 , 이전 열의 값을 바탕으로 구하는 것이므로
    // 첫번째 행에서 값을 구하는 경우 0을 사용해야 하므로 +1씩 추가
    let sumBoard = new Array(N + 1).fill().map(() => new Array(N + 1).fill(0));

    for (let i = 1; i < N + 1; i++) {
      for (let j = 1; j < N + 1; j++) {
        let num = board[i - 1][j - 1];
        sumBoard[i][j] =
          num +
          sumBoard[i][j - 1] +
          sumBoard[i - 1][j] -
          sumBoard[i - 1][j - 1];
      }
    }

    return sumBoard;
  };

  let sumBoard = makeSumBoard();

  let result = [];
  for (let i = 0; i < cords.length; i++) {
    const [x1, y1, x2, y2] = cords[i];

    result.push(
      sumBoard[x2][y2] - (sumBoard[x1 - 1][y2] + sumBoard[x2][y1 - 1]) + sumBoard[x1 - 1][y1 - 1],
    );
  }

  console.log(result.join('\n'))
  process.exit();
});
