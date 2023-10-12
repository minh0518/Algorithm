const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [row, col] = data.shift().split(' ').map(Number);
  const board = data.map((i) => i.split(' ').map(Number));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const checkOneCount = (board) => {
    let count = 0;
    board.forEach((row) => {
      count += row.filter((col) => col === 1).length;
    });

    return count;
  };

  const bfs = () => {
    const queue = [];
    queue.push([0, 0]);
    const visited = new Array(row).fill().map(() => new Array(col).fill(false));

    while (queue.length) {
      let [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= row || ny < 0 || ny >= col || visited[nx][ny]) continue;
        const nextValue = board[nx][ny];

        if (nextValue === 0) {
          queue.push([nx, ny]);
        }
        // 치즈를 만나면 0으로만 바꿔주고 방문은 하지 못하게
        // queue에 push하지 않고 방문 처리만 해준다
        if (nextValue === 1) {
          board[nx][ny] = 0;
        }
        visited[nx][ny] = true;
      }
    }
  };

  const result = [checkOneCount(board)];
  let count = 0;
  while (1) {
    bfs();
    count += 1;
    const oneCount = checkOneCount(board);
    if (oneCount) result.push(oneCount);
    if (!oneCount) break;
  }

  console.log([count, result.length === 0 ? 0 : result[result.length - 1]].join('\n'));

  process.exit();
});
