const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [M, N] = data.shift().split(' ').map(Number);

  let map = data.map((i) => i.split('').map(Number));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const dfs = (x,y) => {

    map[x][y] = 1;

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx >= 0 && nx < M && ny >= 0 && ny < N && map[nx][ny] === 0) {
        dfs(nx, ny);
      }
    }
  };

  // 깊은복사를 해주지 않으면 map이 아래에서 바뀔 때 beforeInnerSide도
  // 같이 바뀌게 된다
  let beforeInnerSide = [...map[M - 1]];
  for (let i = 0; i < N; i++) {
    if (map[0][i] === 1) continue;
    dfs(0, i);
  }
  let afterInnerSide = [...map[M - 1]];

  console.log(
    beforeInnerSide.join('') === afterInnerSide.join('') ? 'NO' : 'YES',
  );

  process.exit();
});
