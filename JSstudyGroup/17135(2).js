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
  const ARCHER_COUNT = 3;

  const result = [];

  const getDistance = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  // 궁수의 열 좌표에 대한 조합 생성
  const dfs = (current, index) => {
    // 현재 조합을 기반으로 계산 진행

    if (current.length === ARCHER_COUNT) {
      const copyBoard = JSON.parse(JSON.stringify(board));

      // 현재 궁수의 행열 좌표
      let archerCords = current.map((i) => [N, i]);

      let eliminateCount = 0;

      while (copyBoard.length && !copyBoard.every((row) => row.every((col) => col === 0))) {
        // 적 위치 파악
        const enemyCords = [];
        for (let i = 0; i < copyBoard.length; i++) {
          for (let j = 0; j < copyBoard[i].length; j++) {
            const value = copyBoard[i][j];
            if (value === 0) continue;
            enemyCords.push([i, j]);
          }
        }

        // 각 궁수가 쏠 수 있는 적 위치들을 파악
        for (let archer of archerCords) {
          const currentArcherTarget = [];
          for (let enemy of enemyCords) {
            const currentDistance = getDistance(archer[0], archer[1], enemy[0], enemy[1]);
            if (currentDistance > D) continue;
            currentArcherTarget.push([...enemy, currentDistance]);
          }

          if (!currentArcherTarget.length) continue;

          // 쏠 수 있는 적들이 있다면 문제에 따라 정렬
          currentArcherTarget.sort((a, b) => {
            if (a[2] === b[2]) {
              return a[1] - b[1];
            }
            return a[2] - b[2];
          });

          const [x, y, distance] = currentArcherTarget[0];

          // 이미 해당 좌표가 0이라면 다른 궁수로부터 동시에 맞은적이 있다는 것이므로
          // 카운트 x
          if (copyBoard[x][y] !== 0) eliminateCount += 1;
          copyBoard[x][y] = 0;
        }

        // 다음 턴 진행 - 지도 아랫줄 제거, 궁수 행 좌표-1(지도 전체가 한칸 줄어들었으므로)
        copyBoard.pop();
        archerCords = archerCords.map((i) => {
          return [i[0] - 1, i[1]];
        });
      }

      result.push(eliminateCount);

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
