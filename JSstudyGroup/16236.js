const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // 상어 크기 2
  // 자기 크기 이하인 곳 이동가능
  // 자기 크기 미만인 곳 섭취 가능
  // 자기 크기만한 물고기들을 먹어야 1이 커짐
  // 가까운 물고기를 먹음
  // 거리가 같으면 가장 위에 ->가장 왼쪽에 우선순위로 먹음

  const N = +data.shift();
  const map = data.map((i) => i.split(' ').map(Number));

  // 최초 상어 시작지점
  let sharkCord;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 9) sharkCord = [i, j];
    }
  }
  let sharkSize = 2;
  let eatCount = 0;

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  // 최단거리
  const bfs = (x, y) => {
    const queue = [];
    queue.push([x, y, 0]);
    const fishCords = [];
    const visited = new Array(N).fill().map(() => new Array(N).fill(false));
    visited[x][y] = true;
    while (queue.length) {
      const [x, y, depth] = queue.shift();

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny]) continue;

        // 먹을 수 있는
        if (map[nx][ny] >= 1 && map[nx][ny] <= 6 && map[nx][ny] < sharkSize) {
          fishCords.push([nx, ny, depth + 1]);
          visited[nx][ny] = true;
        }

        // 움직일 수 있는
        if (map[nx][ny] <= sharkSize) {
          queue.push([nx, ny, depth + 1]);
          visited[nx][ny] = true;
        }
      }
    }

    // bfs 탐색이 끝나면 반환
    return fishCords;
  };

  let count = 0;
  while (1) {
    const copyMap = map.map((i) => i.join('')).join('');

    const [x, y] = sharkCord;
    const fishCords = bfs(x, y);

    if (!fishCords.length) break;

    // 비용 -> 상 -> 왼 순으로 오름차순
    fishCords.sort((a, b) => {
      if (a[2] === b[2]) {
        if (a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
      }
      return a[2] - b[2];
    });

    const [row, col, depth] = fishCords[0];
    eatCount += 1;

    // 기존 상어 위치 초기화 (이동할 것이므로)
    map[sharkCord[0]][sharkCord[1]] = 0;

    // 상어 위치 변경
    sharkCord = [row, col];

    // 상어가 먹은 물고기 자리 초기화
    map[row][col] = 0;

    // 이동거리 추가
    count += depth;

    if (eatCount === sharkSize) {
      sharkSize += 1;
      eatCount = 0;
    }

    if (copyMap === map.map((i) => i.join('')).join('')) break;
  }

  console.log(count);

  process.exit();
});
