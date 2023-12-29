const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();
  const board = data.map((i) => i.split(''));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const visitedForNormal = new Array(N).fill().map(() => new Array(N).fill(false));
  const visitedForNotNormal = new Array(N).fill().map(() => new Array(N).fill(false));

  const dfsForNormal = (x, y, target) => {
    visitedForNormal[x][y] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N || visitedForNormal[nx][ny] || board[nx][ny] !== target) continue;
      dfsForNormal(nx, ny, target);
    }
  };

  const dfsForNotNormal = (x, y, isBlue) => {
    visitedForNotNormal[x][y] = true;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N || visitedForNotNormal[nx][ny]) continue;
      if (board[nx][ny] === 'B' && !isBlue) continue;
      if (board[nx][ny] !== 'B' && isBlue) continue;

      dfsForNotNormal(nx, ny, isBlue);
    }
  };

  let [red, green, redGreen, blue] = [0, 0, 0, 0];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const value = board[i][j];

      if (value === 'R' && !visitedForNormal[i][j]) {
        red += 1;
        dfsForNormal(i, j, value);
      }
      if (value === 'R' && !visitedForNotNormal[i][j]) {
        redGreen += 1;
        dfsForNotNormal(i, j, false);
      }

      if (value === 'G' && !visitedForNormal[i][j]) {
        green += 1;
        dfsForNormal(i, j, value);
      }
      if (value === 'G' && !visitedForNotNormal[i][j]) {
        redGreen += 1;
        dfsForNotNormal(i, j, false);
      }

      if (value === 'B' && !visitedForNormal[i][j]) {
        blue += 1;
        dfsForNormal(i, j, value);
        dfsForNotNormal(i, j, true);
      }
    }
  }

  const normal = red + green + blue;
  const notNormal = redGreen + blue;

  console.log(normal, notNormal);

  process.exit();
});
