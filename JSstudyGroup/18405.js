const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, K] = data.shift().split(' ').map(Number);
  const map = data.slice(0, N).map((i) => i.split(' ').map(Number));
  const [S, X, Y] = data[data.length - 1].split(' ').map(Number);

  const cord = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let value = map[i][j];
      if (value === 0) continue;
      cord.push([value, i, j]);
    }
  }

  // 바이러스 번호 오름차순 정렬
  cord.sort((a, b) => {
    return a[0] - b[0];
  });

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];
  const bfs = (queue) => {
    // queue의 각 내용에 시간 정보 추가
    queue = queue.map((i) => {
      return [0, ...i];
    });
    while (queue.length) {
      const [time, value, x, y] = queue.shift();
      if (time === S) return;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N || map[nx][ny] !== 0) continue;
        map[nx][ny] = value;
        queue.push([time + 1, value, nx, ny]);
      }
    }
  };
  bfs(cord); // 좌표 정보들이 담긴 배열을 그대로 queue로 사용

  console.log(map[X - 1][Y - 1]);

  process.exit();
});
