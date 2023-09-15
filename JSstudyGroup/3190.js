const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // 방향 전환 함수
  const changeDirIndex = (dir, dirIndex) => {
    if (dir === 'D') {
      switch (dirIndex) {
        case 0:
          dirIndex = 3;
          break;
        case 1:
          dirIndex = 2;
          break;
        case 2:
          dirIndex = 0;
          break;
        case 3:
          dirIndex = 1;
          break;
      }
    }
    if (dir === 'L') {
      switch (dirIndex) {
        case 0:
          dirIndex = 2;
          break;
        case 1:
          dirIndex = 3;
          break;
        case 2:
          dirIndex = 1;
          break;
        case 3:
          dirIndex = 0;
          break;
      }
    }

    return dirIndex;
  };

  // 보드의 크기
  const N = +data.shift();

  // 사과의 갯수
  const K = +data.shift();

  const appleCord = data.slice(0, K).map((i) => i.split(' ').map(Number));

  const moveInfo = data.slice(K + 1).map((i) =>
    i.split(' ').map((i) => {
      if (!isNaN(i)) return Number(i);
      return i;
    }),
  );

  const map = new Array(N).fill().map(() => new Array(N).fill(0));
  appleCord.forEach((i) => {
    const [x, y] = [i[0] - 1, i[1] - 1];
    map[x][y] = 'a';
  });
  map[0][0] = 1;

  // 시간
  let count = 0;

  // 뱀의 머리
  let [x, y] = [0, 0];

  // 방향
  let dirIndex = 3;
  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const visited = [[0, 0]];
  while (1) {
    // 방향 전환
    if (moveInfo.length && count === moveInfo[0][0]) {
      let changeDir = moveInfo.shift();
      dirIndex = changeDirIndex(changeDir[1], dirIndex);
    }

    const nx = x + dx[dirIndex];
    const ny = y + dy[dirIndex];

    // 범위 초과
    if (!(nx >= 0 && nx < N && ny >= 0 && ny < N)) {
      break;
    }

    const nextValue = map[nx][ny];

    // 자기자신과 부딪혔을 때
    if (nextValue === 1) {
      break;
    }

    // 머리 이동
    map[nx][ny] = 1;

    // 꼬리 이동
    visited.push([nx, ny]);
    if (nextValue === 0) {
      const reset = visited.shift();
      map[reset[0]][reset[1]] = 0;
    }

    x = nx;
    y = ny;
    count += 1;
  }

  console.log(count + 1);

  process.exit();
});
