// 2024.1.11

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M] = data.shift().split(' ').map(Number);
  const board = data.map((i) => i.split(' ').map(Number));

  // 벽을 제외한 모든 부분의 갯수(= 방문횟수가 이것과 같아야 모든 연구소에 바이러스가 퍼진 것)
  const totalCount = board
    .map((row) => {
      return row.filter((col) => col !== 1).length;
    })
    .reduce((a, b) => a + b, 0);

  const virus = [];
  board.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === 2) virus.push([i, j]);
    });
  });

  const searchIndexs = [];
  const dfs = (current, index) => {
    if (current.length === M) {
      searchIndexs.push([...current]);
      return;
    }

    for (let i = index; i < virus.length; i++) {
      current.push(i);
      dfs(current, i + 1);
      current.pop();
    }
  };
  dfs([], 0);

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const bfs = (startIndexs) => {
    const queue = [];
    const visited = new Array(N).fill().map(() => new Array(N).fill(0));

    for (let i of startIndexs) {
      const [x, y] = virus[i];
      queue.push([x, y, 0]);
      visited[x][y] = 'x';
    }

    while (queue.length) {
      const [x, y, value] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx < 0 || nx >= N || ny < 0 || ny >= N || board[nx][ny] === 1 || visited[nx][ny] !== 0) continue;
        visited[nx][ny] = value + 1;
        queue.push([nx, ny, value + 1]);
      }
    }

    // visited에서 0이 아닌(=방문한) 갯수가 totalCount와 같아야 바이러스가 전부 퍼진 것
    const visitedCount = visited
      .map((row) => {
        return row.filter((col) => col !== 0).length;
      })
      .reduce((a, b) => a + b, 0);
    if (visitedCount !== totalCount) return -1;
    let maxValue = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const value = visited[i][j];
        if (value > maxValue) maxValue = value;
      }
    }
    return maxValue;
  };

  const reuslt = [];
  for (let i of searchIndexs) {
    const searchResult = bfs(i);
    if (searchResult === -1) continue;
    reuslt.push(searchResult);
  }

  console.log(reuslt.length ? Math.min(...reuslt) : -1);
  process.exit();
});
