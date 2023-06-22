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
  let graph = data.map((i) => i.split(' ').map(Number));

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];
  let result = 0;
  const bfs = (tomatos) => {
    let queue = [];
    let start = 0;
    tomatos.forEach((i) => queue.push(i));
    let tomatoLength = queue.length;

    while (queue.length) {
      // 하루치 토마토가 익는 만큼만 진행
      for (let i = start; i < tomatoLength; i++) {
        let [x, y] = queue[i];

        for (let j = 0; j < 4; j++) {
          let nx = x + dx[j];
          let ny = y + dy[j];

          if (nx >= 0 && nx < N && ny >= 0 && ny < M && graph[nx][ny] === 0) {
            queue.push([nx, ny]);
            graph[nx][ny] = 1;
          }
        }
      }
      // 더이상 익은게 없으므로 끝
      if (tomatoLength === queue.length) return;

      // 새로 추가된 범위에서만 탐색 시작 (= 새로 익은 토마토들의 주변만 탐색 )
      // 큐의 범위를 수정
      start = tomatoLength;
      tomatoLength = queue.length;
      result += 1;
    }
  };

  let tomatos = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 1) tomatos.push([i, j]);
    }
  }

  bfs(tomatos);

  graph.forEach((i) => {
    if (i.filter((i) => !i).length >= 1) {
      result = -1;
    }
  });
  console.log(result);

  process.exit();
});
