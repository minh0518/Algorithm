// 24.1.18
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M, D] = data.shift().split(' ').map(Number);
  const board = data.map((i) => i.split(' ').map(Number));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const getDistance = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  // 시작 좌표로부터 거리가 depth이하인 좌표를 탐색
  const dfsForSearch = (board, x, y, depth, visited) => {
    visited[x][y] = true;
    const current = [[x, y]];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= board.length + 1 || ny < 0 || ny >= M || visited[nx][ny]) continue;
      if (depth + 1 <= D) {
        current.push(...dfsForSearch(board, nx, ny, depth + 1, visited));
      }
    }
    return current;
  };

  // 전역으로 사용되는 각 궁수의 좌표로 부터 D이하인 거리로 쏠 수 있는 좌표들
  // 궁수 위치는 N+1번행 기준(최초 상태)
  const distanceInfo = new Map();

  // distanceInfo를 모든 열에 대해 탐색
  for (let i = 0; i < M; i++) {
    const x = N; // 궁수 위치는 N+1번행 기준(최초 상태)
    const y = i;
    let cords = dfsForSearch(
      board,
      x,
      y,
      0,
      new Array(N + 1).fill().map(() => new Array(M).fill(false)),
    );
    cords = cords.filter((i) => i[0] !== N); // 전체 탐색 좌표에서 궁수가 있는 행은 제거
    distanceInfo.set(i, cords);
  }

  const calc = (current) => {
    // 궁수 위치 제외한 board를 복사
    const copyBoard = JSON.parse(JSON.stringify(board));

    // 한 턴마다 copyBoard의 마지막 줄이 pop되는 횟수
    let popCount = 0;

    // 명중 횟수
    let count = 0;

    while (popCount !== N) {
      const shootCord = [];

      // 현재 경우의 수로 넘어온 current의 각 열 좌표를 순회
      for (let col of current) {
        const x = copyBoard.length; // 행은 현재 copyBoard마지막 인덱스 + 1
        const y = col;

        // distanceInfo에서 현재 열에서 쏠 수 있는 모든 좌표를 가져옴.
        // 다만, distanceInfo의 궁수 위치는 N+1번행 기준이므로 행 좌표에서 popCount만큼 빼야 함
        let cords = distanceInfo.get(i).map((arr) => [arr[0] - popCount, arr[1]]);

        // D거리 이하의 모든 좌표를 구하는 것이므로 나중에 가면 행 좌표가 음수가 나오는 경우가 있음
        // 이에 대한 필터링 + 해당 좌표에 적이 있는 좌표만 필터링
        cords = cords.filter((i) => {
          const row = i[0];
          return row >= 0 && copyBoard[row][i[1]] === 1;
        });

        // 거리 추가
        cords = cords.map((arr) => {
          const distance = getDistance(arr[0], arr[1], x, y);
          return [...arr, distance];
        });

        // 거리를 기반으로 오름차순,
        // 거리가 같다면 열이 작은(=가장 왼쪽) 순서로 오름차순
        cords.sort((a, b) => {
          if (a[2] === b[2]) {
            return a[1] - b[1];
          }
          return a[2] - b[2];
        });

        // 없다면 다음 행에 대해 연산 진행
        if (!cords.length) continue;

        // sort된 좌표의 맨 앞(=가장 가깝거나, 왼쪽에 있거나) 좌표만 최종 push
        shootCord.push(cords[0]);
      }

      // 문제에서 '동시에' 쏘라고 했으므로
      // 현재 경우의 수로 넘어온 current의 각 열 좌표에서 쏠 수 있는
      // 좌표를 확정하고 여기서 최종적으로 한번에 쏴야 함
      for (let [x, y, _] of shootCord) {
        const value = copyBoard[x][y];

        // 적에 대해 사격
        if (value === 1) {
          copyBoard[x][y] = 0;
          count += 1;
        }

        // 해당 좌표에 사격을 해야 하는데 앞서 사격이 된 좌표라면 그냥 넘어가야 한다
      }

      // 다음 턴
      copyBoard.pop();
      popCount += 1;
    }

    return count;
  };

  // 메인 로직
  const result = [];
  const dfs = (current, index) => {
    // 궁수 3명의 열 위치에 대한 조합
    if (current.length === 3) {
      result.push(calc(current));
      return;
    }

    for (let i = index; i < M; i++) {
      current.push(i);
      dfs(current, i + 1);
      current.pop();
    }
  };

  dfs([], 0);

  console.log(Math.max(...result));

  process.exit();
});
