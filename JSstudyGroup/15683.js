const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // 상 우 하 좌
  const [dx, dy] = [
    [-1, 0, 1, 0],
    [0, 1, 0, -1],
  ];

  const [N, M] = data.shift().split(' ').map(Number);
  const board = data.map((i) => i.split(' ').map(Number));

  const bfs = (x, y, number, circleNum) => {
    const current = [];
    if (number === 1) {
      // dfs에서 넘겨준 circleNum으로 넘어온 방향만 탐색
      for (let j = circleNum; j < circleNum + 1; j++) {
        const queue = [[x, y, j % 4]];
        while (queue.length) {
          const [x, y, dir] = queue.shift();
          const nx = x + dx[dir];
          const ny = y + dy[dir];
          if (nx < 0 || nx >= N || ny < 0 || ny >= M || board[nx][ny] === 6) continue;
          current.push([nx, ny].join(' ')); // 문자열 단위로 추가
          queue.push([nx, ny, dir]);
        }
      }
    }
    if (number === 2) {
      // dfs에서 넘겨준 circleNum으로 '넘어온 방향과' 다다음 방향'만' 탐색
      // (상) 하
      // (우) 좌
      for (let j = circleNum; j < circleNum + 3; j += 2) {
        const queue = [[x, y, j % 4]];
        while (queue.length) {
          const [x, y, dir] = queue.shift();
          const nx = x + dx[dir];
          const ny = y + dy[dir];
          if (nx < 0 || nx >= N || ny < 0 || ny >= M || board[nx][ny] === 6) continue;
          current.push([nx, ny].join(' '));
          queue.push([nx, ny, dir]);
        }
      }
    }
    if (number === 3) {
      // dfs에서 넘겨준 circleNum으로 넘어온 방향~다음 방향'까지' 탐색
      for (let j = circleNum; j < circleNum + 2; j++) {
        const queue = [[x, y, j % 4]];
        while (queue.length) {
          const [x, y, dir] = queue.shift();
          const nx = x + dx[dir];
          const ny = y + dy[dir];
          if (nx < 0 || nx >= N || ny < 0 || ny >= M || board[nx][ny] === 6) continue;
          current.push([nx, ny].join(' '));
          queue.push([nx, ny, dir]);
        }
      }
    }
    if (number === 4) {
      // dfs에서 넘겨준 circleNum으로 넘어온 방향~다다음 방향'까지' 탐색
      for (let j = circleNum; j < circleNum + 3; j++) {
        const queue = [[x, y, j % 4]];
        while (queue.length) {
          const [x, y, dir] = queue.shift();
          const nx = x + dx[dir];
          const ny = y + dy[dir];
          if (nx < 0 || nx >= N || ny < 0 || ny >= M || board[nx][ny] === 6) continue;
          current.push([nx, ny].join(' '));
          queue.push([nx, ny, dir]);
        }
      }
    }
    if (number === 5) {
      // dfs에서 넘겨준 circleNum으로 넘어온 방향~다다다음 방향'까지' 탐색
      for (let j = circleNum; j < circleNum + 4; j++) {
        const queue = [[x, y, j % 4]];
        while (queue.length) {
          const [x, y, dir] = queue.shift();
          const nx = x + dx[dir];
          const ny = y + dy[dir];
          if (nx < 0 || nx >= N || ny < 0 || ny >= M || board[nx][ny] === 6) continue;
          current.push([nx, ny].join(' '));
          queue.push([nx, ny, dir]);
        }
      }
    }

    return current;
  };

  const result = [];
  const dfs = (cords, index, current) => {
    // 조합 완성
    if (index === cords.length) {
      const set = new Set();
      for (let i of current) {
        for (let j of i) {
          const [x, y] = j.split(' ').map(Number);
          if (board[x][y] !== 0) continue;
          set.add(j);
        }
      }
      // 전체 갯수 - 감시된 좌표 갯수 - cctv갯수
      result.push(N * M - set.size - countWithoutZero);

      return;
    }

    const [x, y] = cords[index];
    const number = board[x][y];

    if (number === 1) {
      // 4방향
      for (let i = 0; i < 4; i++) {
        const searchCords = bfs(x, y, number, i);
        current.push(searchCords);
        dfs(cords, index + 1, current);
        current.pop(); // bfs에서 문자열 단위로 추가했기 때문에
        // pop한번만으로 bfs로 탐색한 좌표들을 한번에 제거 가능
      }
    }
    if (number === 2) {
      // 2방향
      for (let i = 0; i < 2; i++) {
        const searchCords = bfs(x, y, number, i);
        current.push(searchCords);
        dfs(cords, index + 1, current);
        current.pop();
      }
    }
    if (number === 3) {
      // 4방향
      for (let i = 0; i < 4; i++) {
        const searchCords = bfs(x, y, number, i);
        current.push(searchCords);
        dfs(cords, index + 1, current);
        current.pop();
      }
    }
    if (number === 4) {
      // 4방향
      for (let i = 0; i < 4; i++) {
        const searchCords = bfs(x, y, number, i);
        current.push(searchCords);
        dfs(cords, index + 1, current);
        current.pop();
      }
    }
    if (number === 5) {
      // 방향이 1개 뿐이므로 바로 bfs호출
      const searchCords = bfs(x, y, number, 0);
      current.push(searchCords);
      dfs(cords, index + 1, current);
      current.pop();
    }
  };

  const cords = [];
  let countWithoutZero = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const value = board[i][j];
      if (value !== 6 && value !== 0) cords.push([i, j]);
      if (value !== 0) countWithoutZero += 1;
    }
  }

  dfs(cords, 0, []);

  console.log(Math.min(...result));

  process.exit();
});
