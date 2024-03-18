// 24.3.18
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [H, W] = data.shift().split(' ').map(Number);

  // 배열 좌표의 높이에 맞게 반환해서 받음
  // ex) 벽 높이가 4이고 좌표가 3일때, [1]을 받음 >> [1]부터 행의 끝까지 벽을 세움
  const walls = data
    .shift()
    .split(' ')
    .map(Number)
    .map((i) => H - i);

  const board = new Array(H).fill().map(() => new Array(W).fill(0));

  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    for (let j = wall; j < H; j++) {
      board[j][i] = 1;
    }
  }
  // console.log(board.map((i) => i.join(' ')).join('\n'));

  let result = 0;
  while (board.length) {
    const currentFloor = board.pop();

    const start = currentFloor.indexOf(1);
    const end = currentFloor.lastIndexOf(1);
    if (start === end) continue;

    const betweenWalls = currentFloor.slice(start + 1, end);
    // console.log(betweenWalls);

    result += betweenWalls.filter((i) => i === 0).length;
  }
  console.log(result);

  process.exit();
});
