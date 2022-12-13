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
  let board = data.map((i) => i.split(''));

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const swap = (x, y) => {
    let result = [];
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
        if (board[x][y] !== board[nx][ny]) {
          [board[x][y], board[nx][ny]] = [board[nx][ny], board[x][y]];
          result.push(calcForSame());
          [board[nx][ny], board[x][y]] = [board[x][y], board[nx][ny]];

          // swap하고 계산하고 다시 원상복구
        }
      }
    }

    return result;
  };

  const calcForSame = () => {
    //가로 비교
    let count = 1;
    let result = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N - 1; j++) {
        if (board[i][j] === board[i][j + 1]) count++;
        else {
          //CCPPP같은 경우, 중간에 다른게 있으면 끊고 다시 시작
          result.push(count);
          count = 1;
        }
      }
      result.push(count);
      count = 1;
      //각 행or열이 끝날때도 push를 반드시 해줘야 한다
      //마지막 값까지 같다면 거기까지 count한 것을 저장해야 하고
      //다시 count값을 초기화 해야 하기 때문
    }

    //세로 비교
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N - 1; j++) {
        if (board[j][i] === board[j + 1][i]) count++;
        else {
          result.push(count);
          count = 1;
        }
      }
      result.push(count);
      count = 1;
    }

    return Math.max(...result);
  };

  let result = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      result.push(...swap(i, j));
    }
  }

  console.log(Math.max(...result));

  process.exit();
});