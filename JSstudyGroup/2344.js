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

  let box = data.map((i) => i.split(' ').map(Number));

  //상하좌우
  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  //d가 현재 빛의 방향 direction이 변환기
  let direction = [3, 2, 1, 0];
  //상 하 좌 우 (상이 상에서 쏜다는게 아니라 상으로 가는 방향임)
  //3 2 1 0

  const move = (d, x, y) => {
    while (x >= 0 && x < N && y >= 0 && y < M) {
      if (box[x][y] === 1) {
        d = direction[d];
      }
      x = x + dx[d];
      y = y + dy[d];
    }

    //밖으로 나갈시의 좌표기반으로 숫자를 리턴
    if (x === -1) return 2 * M + 2 * N - y;
    if (x === N) return N + y + 1;
    if (y === -1) return x + 1;
    if (y === M) return 2 * N + M - x;
  };

  let result = [];
  for (let i = 0; i < N; i++) {
    let d = 3;
    result.push(move(d, i, 0));
    //0 0
    //1 0
  }

  for (let i = 0; i < M; i++) {
    let d = 0;
    result.push(move(d, N - 1, i));
  }

  for (let i = N - 1; i >= 0; i--) {
    let d = 2;
    result.push(move(d, i, M - 1));
  }

  for (let i = M - 1; i >= 0; i--) {
    let d = 1;
    result.push(move(d, 0, i));
  }

  console.log(result.join(' '));

  process.exit();
});

// 0 1 0
// 0 1 1

//0 10 9 8 0
//1  0 x 0 7
//2  0 x x 6
//0  3 4 5 0

//왼쪽에서 쏘면 위로
//오른쪽에서 쏘면 아래로

//위에서 쏘면 왼쪽으로
//아래에서 쏘면 오른쪽으로
