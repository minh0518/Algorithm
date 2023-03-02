const { FORMERR } = require('dns');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [M, N, H] = data.shift().split(' ').map(Number);

  let tmp = data.map((i) => i.split(' ').map(Number));

  let tomato = [];
  for (let i = 0; i < tmp.length; i += N) {
    tomato.push(tmp.slice(i, i + N));
  }

  let cords = [];
  for (let i = 0; i < H; i++) {
    let dimension = i;
    let board = tomato[i];
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < M; y++) {
        if (board[x][y] === 1) cords.push([dimension, x, y]);
      }
    }
  }

  const bfs = () => {
    let count = 0;
    let [d, dx, dy] = [
      [0, 0, 0, 0, -1, 1],
      [-1, 1, 0, 0, 0, 0],
      [0, 0, -1, 1, 0, 0],
    ];

    let startIndex = 0;
    while (1) {
      let flag = false;
      let cycle = cords.length;

      for (let i = startIndex; i < cycle; i++) {
        let cord = cords[i];
        for (let dir = 0; dir < 6; dir++) {
          let nd = cord[0] + d[dir];
          let nx = cord[1] + dx[dir];
          let ny = cord[2] + dy[dir];

          if (
            nx >= 0 &&
            nx < N &&
            ny >= 0 &&
            ny < M &&
            nd >= 0 &&
            nd < H &&
            tomato[nd][nx][ny] === 0
          ) {
            tomato[nd][nx][ny] = 1;
            cords.push([nd, nx, ny]);
            flag = true;
          }
        }
      }
      if (!flag) return count;
      startIndex = cycle;
      count += 1;
    }
  };

  let answer = bfs();

  for (let i = 0; i < H; i++) {
    let board = tomato[i];
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < M; y++) {
        if (board[x][y] === 0) answer = -1;
      }
    }
  }

  console.log(answer);

  process.exit();
});
