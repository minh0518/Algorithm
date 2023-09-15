const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M] = data.shift().split(' ').map(Number);

  const map = data.map((i) => i.split(' ').map(Number));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  let result = 0;
  const dfs = (x, y, depth, current) => {
    if (depth === 4) {
      if (result < current) result = current;
      return;
    }

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M || map[nx][ny] === 'x') continue;
      let value = map[nx][ny];
      current += value;
      map[nx][ny] = 'x';
      dfs(nx, ny, depth + 1, current);
      current -= value;
      map[nx][ny] = value;
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      dfs(i, j, 0, 0);
    }
  }

  // ㅜ 모양 탐색 진행

  // ㅏ ㅜ
  const firstCross = [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1],
  ];

  // ㅓㅗ
  const secondCross = [
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 0],
  ];

  const check = (row, col, cordInfo) => {
    let flag = false;
    let sum = 0;
    // 이건 dfs가 아니므로 따로 방문 배열 사용할 필요가 없음
    for (let [x, y] of cordInfo) {
      let nx = row + x;
      let ny = col + y;
      if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
        flag = true;
        break;
      }
      sum += map[nx][ny];
    }
    if (!flag) {
      if (result < sum) result = sum;
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      // ㅏ
      check(i, j, firstCross);

      // ㅜ
      check(
        i,
        j,
        firstCross.map((i) => {
          return [i[1], i[0]];
        }),
      );

      // ㅓ
      check(i, j, secondCross);

      // ㅗ
      check(
        i,
        j,
        secondCross.map((i) => {
          return [i[1], i[0]];
        }),
      );
    }
  }

  console.log(result);

  process.exit();
});
