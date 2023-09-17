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
  const wall = data.shift().split(' ').map(Number);

  const map = new Array(H).fill().map(() => new Array(W).fill(0));

  // 좌표를 바탕으로 2차원 배열에 벽 생성
  wall.forEach((i, index) => {
    let rowFromBottom = i;
    if (rowFromBottom !== 0) {
      map[H - rowFromBottom][index] = 1;

      while (rowFromBottom-- !== 1) {
        map[H - rowFromBottom][index] = 1;
      }
    }
  });

  // console.log(map.map((i) => i.join('')).join('\n'));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  let result = 0;
  const dfs = (x, y, height) => {
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx >= height && nx < H && ny >= 0 && ny < W && map[nx][ny] === 0) {
        map[nx][ny] = 'x'; // 최초 시작점은 1이므로 여기서부터 체크
        dfs(nx, ny, height);
      }
    }
  };

  for (let i = 0; i < W; i++) {
    for (let j = 0; j < H; j++) {
      if (map[j][i] !== 1) continue;

      const currentRowWithOne = map[j].filter((i) => i === 1);
      if (currentRowWithOne.length >= 2 && currentRowWithOne.length < W) {
        dfs(j, i, j);
      }
      break; // 위에서 부터 탐색하며 최초 1을 발견하고
      // 조건에 맞아서 dfs를 호출했든 안 했든 다음 열로 넘어가야 함
    }
  }

  // 현재 행의 좌우로 연결된 x를 제거
  const removeSameRow = (x, y, height) => {
    map[x][y] = 0;

    let left = y + dy[2];
    if (left >= 0 && left < W && map[x][left] === 'x') {
      removeSameRow(x, left, height);
    }
    let right = y + dy[3];
    if (right >= 0 && right < W && map[x][right] === 'x') {
      removeSameRow(x, right, height);
    }
  };

  // 마지막으로 양쪽 뚫린 벽에 대한 검사를 진행
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (map[i][j] === 'x' && (j === 0 || j === W - 1)) {
        removeSameRow(i, j, i);
      }
    }
  }

  map.forEach((i) => {
    result += i.filter((i) => i === 'x').length;
  });

  console.log(result);

  process.exit();
});
