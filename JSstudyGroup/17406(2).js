const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M, K] = data.shift().split(' ').map(Number);
  const baord = data.slice(0, N).map((row) => row.split(' ').map(Number));
  const rotateInfo = data.slice(N).map((i) => i.split(' ').map(Number));

  // 반시계 방향 (하 우 상 좌)
  const [dx, dy] = [
    [1, 0, -1, 0],
    [0, 1, 0, -1],
  ];

  const rotate = (r, c, s, baord) => {
    // 배열에서 각 깊이별로 회전을 진행하는 횟수
    let depth = Math.floor((s * 2 + 1) / 2);

    // 시작, 끝 좌표
    let start = [r - s - 1, c - s - 1];
    let end = [r + s - 1, c + s - 1];

    while (depth--) {
      let dirIndex = 0;

      let [x, y] = [...start];
      const startPointValue = baord[x][y];

      while (1) {
        let nx = x + dx[dirIndex];
        let ny = y + dy[dirIndex];

        // 범위 초과시, 방향 변경
        if (nx < start[0] || nx > end[0] || ny < start[1] || ny > end[1]) {
          dirIndex += 1;
          nx = x + dx[dirIndex];
          ny = y + dy[dirIndex];
        }

        // 시작지점까지 되돌아 왔을 때, 회전 종료
        if (nx === start[0] && ny === start[1]) {
          baord[x][y] = startPointValue;
          break;
        }

        baord[x][y] = baord[nx][ny];
        x = nx;
        y = ny;
      }

      // (다음 depth에 해당하는 배열 회전을 위해) 시작점과 끝점을 이동
      start = start.map((i) => i + 1);
      end = end.map((i) => i - 1);
    }
  };

  // 회전 순서를 구한 뒤, 매 경우마다 회전 결과값을 저장
  const result = [];

  // 순열
  const visited = new Array(K).fill(false);
  const dfs = (current) => {
    if (current.length === K) {
      const rotatedBoard = JSON.parse(JSON.stringify(baord));
      for (let i = 0; i < current.length; i++) {
        const [r, c, s] = current[i];
        rotate(r, c, s, rotatedBoard);
      }

      result.push(Math.min(...rotatedBoard.map((row) => row.reduce((a, b) => a + b))));
      return;
    }
    for (let i = 0; i < K; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      current.push(rotateInfo[i]);
      dfs(current);
      current.pop();
      visited[i] = false;
    }
  };

  // 메인 로직
  dfs([]);

  console.log(Math.min(...result));

  process.exit();
});
