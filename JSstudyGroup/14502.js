const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number);

  let lab = data.map((i) => i.split(' ').map(Number));

  let answer = 0;

  let zero = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (lab[i][j] === 0) {
        zero.push([i, j]);
      }
    }
  }

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  // 각 경우에 대해서 bfs로 0의 범위를 구함
  const countZero = (lab) => {
    let cnt = 0;
    let queue = [];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (lab[i][j] === 2) queue.push([i, j]);
      }
    }

    while (queue.length) {
      let [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (nx >= 0 && nx < N && ny >= 0 && ny < M && lab[nx][ny] === 0) {
          lab[nx][ny] = 2;
          queue.push([nx, ny]);
        }
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (lab[i][j] === 0) {
          cnt += 1;
        }
      }
    }

    return cnt;
  };

  // let result=[]

  // 백트래킹으로 벽을 세울 수 있는 모든 경우의 수를 구함
  const dfs = (index, depth) => {
    if (depth === 3) {
      let safe = countZero(JSON.parse(JSON.stringify(lab)));
      // result.push(safe)
      answer = safe > answer ? safe : answer;
      return;
    }

    for (let i = index; i < zero.length; i++) {
      let [x, y] = zero[i];
      lab[x][y] = 1;
      dfs(i + 1, depth + 1);
      lab[x][y] = 0;
    }
  };

  dfs(0, 0);

  // console.log(Math.max(...result));
  console.log(answer);

  process.exit();
});
