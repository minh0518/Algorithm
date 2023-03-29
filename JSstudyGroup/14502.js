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

  // 0의 좌표 , 2의 좌표를 미리 받아 둠
  let zero = [];
  let two = [];
  for (let i = 0; i < lab.length; i++) {
    for (let j = 0; j < lab[i].length; j++) {
      if (lab[i][j] === 0) zero.push([i, j]);
      if (lab[i][j] === 2) two.push([i, j]);
    }
  }

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  // 0의 범위를 구하는 bfs
  const bfs = (lab) => {
    let queue = JSON.parse(JSON.stringify(two));

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

    const countZero = () => {
      let count = 0;
      for (let i = 0; i < lab.length; i++) {
        for (let j = 0; j < lab[i].length; j++) {
          if (lab[i][j] === 0) count += 1;
        }
      }
      return count;
    };

    return countZero();
  };


  // 1을 세울 수 있는 모든 경우의 수를 구하기 위한 백트래킹
  let result = [];
  const dfs = (index, depth) => {
    if (depth === 3) {

			// 반드시 깊은 복사로 넘겨줘야 한다
      let zeroZone = bfs(JSON.parse(JSON.stringify(lab)));
      result.push(zeroZone);
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

  console.log(Math.max(...result));

  process.exit();
});