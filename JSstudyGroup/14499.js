const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M, x, y] = data.shift().split(' ').map(Number);

  let map = [];
  for (let i = 0; i < N; i++) {
    map.push(data.shift().split(' ').map(Number));
  }
  let K = data.shift().split(' ').map(Number);

  let dice = new Array(6).fill(0);

  const calcDiceCord = (dir) => {
    if (dir === 1) {
      let diceTmp = [dice[2], dice[1], dice[5], dice[0], dice[4], dice[3]];
      return diceTmp;
    }
    if (dir === 2) {
      let diceTmp = [dice[3], dice[1], dice[0], dice[5], dice[4], dice[2]];
      return diceTmp;
    }
    if (dir === 3) {
      let diceTmp = [dice[4], dice[0], dice[2], dice[3], dice[5], dice[1]];
      return diceTmp;
    }
    if (dir === 4) {
      let diceTmp = [dice[1], dice[5], dice[2], dice[3], dice[0], dice[4]];
      return diceTmp;
    }
  };

  let result = [];

  //동서북남
  let [dx, dy] = [
    [0, 0, -1, 1],
    [1, -1, 0, 0],
  ];

  for (let i = 0; i < K.length; i++) {
    let nextMove = K[i];
    let nx = x + dx[nextMove - 1];
    let ny = y + dy[nextMove - 1];

    if (!(nx >= 0 && nx < N && ny >= 0 && ny < M)) continue;

    dice =calcDiceCord(nextMove)

    if (map[nx][ny] === 0) {
      map[nx][ny] = dice[0];
      result.push(dice[5]);
    } else {
      dice[0] = map[nx][ny];
      map[nx][ny] = 0;
      result.push(dice[5]);
    }

    x = nx;
    y = ny;
  }

  console.log(result.join('\n'));

  process.exit();
});

//기본 >> 이건 실제 주사위에 이렇게 적혀있다는게 아니라
//패턴확인용으로 사용하라는 것 같다
//   2
// 4 1 3
//   5
//   6
//1 2 3 4 5 6

//동
//   2
// 1 3 6
//   5
//   4
//3 2 6 1 5 4

//서
//   2
// 6 4 1
//   5
//   3
//4 2 1 6 5 3

//남
//   1
// 4 5 3
//   6
//   2
// 5 1 3 4 6 2

//북
//   6
// 4 2 3
//   1
//   5
// 2 6 3 4 1 5
