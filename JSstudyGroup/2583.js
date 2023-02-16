const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [M, N, K] = data.shift().split(' ').map(Number);
  let squareInfo = data.map((i) => i.split(' ').map(Number));

  squareInfo = squareInfo.map((i) => {
    let cord = i;
    return cord.map((j, index) => {

      // 열 수정
      if (index === 0) {
        return j;
      }
      if (index === 2) {
        return j - 1;
      }

      // 행 수정
      // 위에서 카운트 , 기준점을 왼 위 , 인덱스
      if (index === 1) {
        // 행 (왼 아래 기준)
        //3이면 2가 되야함 그리고 -1
        return M - j - 1;
      }
      if (index === 3) {
        // 행 (오른쪽 위 기준)
        // 4이면 2가 되야함 그리고 -1
        return M - j + 1 - 1;
      }
    });
  });
  for (let i of squareInfo) {
    [i[0], i[1], i[2], i[3]] = [i[1], i[0], i[3], i[2]];
  }

  let map = new Array(M).fill().map(() => new Array(N).fill('x'));

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];
  const dfsForPaint = (x, y, start, end, visited) => {
    map[x][y] = 'o';
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      // console.log(`nx ny ${nx} ${ny}`);

      if (nx <= start[0] && nx >= end[0] && ny >= start[1] && ny <= end[1]) {
        if (map[nx][ny] === 'x') {
          dfsForPaint(nx, ny, start, end, visited);
          continue;
        }
        if (map[nx][ny] === 'o' && !visited[nx][ny]) {
          dfsForPaint(nx, ny, start, end, visited);
          continue;
        }
      }
    }
  };
  for (let i of squareInfo) {
    let [start, end] = [i.slice(0, 2), i.slice(2)];
    dfsForPaint(
      start[0],
      start[1],
      start,
      end,
      new Array(M).fill().map(() => new Array(N).fill(false)),
    );
  }

  // console.log(map);

  let visited = new Array(M).fill().map(() => new Array(N).fill(false));

  const dfs = (x, y) => {
    //result += 1;
    visited[x][y] = true;

    let count = 1;

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (
        nx >= 0 &&
        nx < M &&
        ny >= 0 &&
        ny < N &&
        map[nx][ny] === 'x' &&
        !visited[nx][ny]
      ) {
        count += dfs(nx, ny);
      }
    }

    return count;
  };

  let result = [];
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 'x' && !visited[i][j]) {
        result.push(dfs(i, j));
      }
    }
  }

  console.log(result.length)
  console.log(result.sort((a,b)=>a-b).join(' '))

  process.exit();
});
