const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M, fuel] = data.shift().split(' ').map(Number);
  const board = data.slice(0, N).map((i) => i.split(' ').map(Number));
  let currentCord = data[N].split(' ')
    .map(Number)
    .map((i) => i - 1);
  const info = data.slice(N + 1).map((i) =>
    i
      .split(' ')
      .map(Number)
      .map((i) => i - 1),
  );

  for (let [sx, sy, ex, ey] of info) {
    board[sx][sy] = [ex, ey];
  }

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  // 매 턴마다 board를 전체 탐색하며 최단거리에 있는 모든 후보들을 한번에 탐색
  const bfsForStartCandidates = (x, y) => {
    // 현재 위치가 곧 시작지점인 경우(거리가 0)
    if (isNaN(board[x][y])) {
      return [[[x, y, ...board[x][y]]], 0];
    }

    let minDinstance = Infinity;
    const queue = [];
    queue.push([x, y, 0]);
    let candidates = [];
    const visited = new Array(N).fill(undefined).map(() => new Array(N).fill(false));
    visited[x][y] = true;

    while (queue.length) {
      const [x, y, value] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N || board[nx][ny] === 1 || visited[nx][ny]) continue;

        const nextValue = value + 1;
        // 도착지가 배열형태로 들어있는 경우(=시작지점)
        if (isNaN(board[nx][ny])) {
          if (minDinstance > nextValue) {
            minDinstance = nextValue;
            candidates = [[nx, ny, ...board[nx][ny]]]; //시작,도착
          } else if (minDinstance === nextValue) {
            candidates.push([nx, ny, ...board[nx][ny]]);
          }
        }
        queue.push([nx, ny, nextValue]);
        visited[nx][ny] = true;
      }
    }
    return [candidates, minDinstance];
  };

  // 시작지점, 도착지점과의 최단거리 도출
  const bfsForDistance = (sx, sy, ex, ey) => {
    const queue = [];
    queue.push([sx, sy, 0]);
    const visited = new Array(N).fill(undefined).map(() => new Array(N).fill(false));
    visited[sx][sy] = true;

    while (queue.length) {
      const [x, y, value] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N || board[nx][ny] === 1 || visited[nx][ny]) continue;

        // 도달할 수 있다면 거리 반환
        if (nx === ex && ny === ey) return value + 1;

        queue.push([nx, ny, value + 1]);
        visited[nx][ny] = true;
      }
    }
    // 도달할 수 없다면 false 반환
    return false;
  };

  // 메인 로직
  let count = 0; // 이동시킨 손님의 수
  while (count !== M) {
    // 1. 현재 위치에서 손님의 시작지점까지 이동
    const [currentX, currentY] = currentCord;
    const [candidates, minDinstance] = bfsForStartCandidates(currentX, currentY);

    // 시작지점까지 도달할 수 있는게 없다면 -1 반환
    if (!candidates.length || minDinstance === Infinity) break;

    fuel -= minDinstance;
    if (fuel < 0) break; // 연료 바닥나면 -1 반환

    candidates.sort((a, b) => {
      if (a[0] === b[0]) return a[1] - b[1];
      return a[0] - b[0];
    });

    const target = candidates[0];
    let [start, end] = [
      [target[0], target[1]],
      [target[2], target[3]],
    ];

    // 2. 손님의 시작지점에서 도착지점까지 이동
    const distanceForEnd = bfsForDistance(start[0], start[1], end[0], end[1]);

    // 시작지점에서 도착지점까지 갈 수 없다면 -1 반환
    // (모든 손님을 이동시킬 수 없는 경우에도 -1을 반환해야 하기 때문)
    if (distanceForEnd === false) break;

    fuel -= distanceForEnd;
    if (fuel < 0) break; // 연료 바닥나면 -1 반환

    // 3. 도착지점으로 이동 및 관련 작업 진행
    currentCord = [...end]; // 현재 위치를 도착지점으로 갱신
    fuel += distanceForEnd * 2; // 연료 갱신
    board[start[0]][start[1]] = 0; // 해당 시작지점 제거
    count += 1; // 이동한 손님의 수 카운팅
  }

  if (fuel < 0 || count !== M) console.log(-1);
  else console.log(fuel);
  process.exit();
});
