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
  const target = +data.shift();
  const arr = new Array(N).fill().map(() => new Array(N).fill(0));

  const [dx, dy] = [
    [1, 0, -1, 0],
    [0, 1, 0, -1],
  ];
  let dirIndex = 3;

  let [x, y] = [-1, 0];
  let reuslt = [];
  for (let i = N ** 2; i >= 1; i--) {
    let nx = x + dx[dirIndex];
    let ny = y + dy[dirIndex];
    if (nx < 0 || nx >= N || ny < 0 || ny >= N || arr[nx][ny] !== 0) {
      dirIndex = (dirIndex + 1) % 4;
      nx = x + dx[dirIndex];
      ny = y + dy[dirIndex];
    }
    arr[nx][ny] = i;
    if (i === target) reuslt.push(nx, ny);
    x = nx;
    y = ny;
  }
  console.log(arr.map((i) => i.join(' ')).join('\n'));
  console.log(reuslt.map((i) => i + 1).join(' '));

  process.exit();
});
