const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();

  let map = data.map((i) => i.split(' ').map(Number));
  let memoizationMap = new Array(N).fill().map(() => new Array(N).fill(0));

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const dfs = (x, y) => {
    // 더이상 갈 수 없는 곳이 없을경우에 사용해야 하므로 dfs 내 전역으로 선언
    let count = 1;

    // 각 재귀 레벨에서 사용되는 좌표로부터 갈 수 있는 모든 경로에 대한
    // 값들을 담는 배열. 여기서 최댓값을 도출한다
    let arrForMaxValue = [];

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < N && map[x][y] < map[nx][ny]) {
        // 9에서 11,15로 갔다가 돌아오고 , 다음 for문에서 12로 탐색을 진행하게 된다
        // 이 때 15까지 탐색하며 사용했던 누적값을 1로 초기화 해줘야한다
        count = 1;

        if (memoizationMap[nx][ny] !== 0) {
          // 메모이제이션 된 값이 있다면 +1 한 값을 push
          arrForMaxValue.push(memoizationMap[nx][ny] + 1);
          continue;
        }
        if (memoizationMap[nx][ny] === 0) {
          // 메모이제이션 된 값이 없다면 직접 가능한 다음 좌표에 대해 재귀탐색
          count += dfs(nx, ny);

          // 재귀가 종료되면 누적값을 push
          // 재귀가 종료됐다는 것은 해당 재귀레벨에서 사용하는 좌표 x,y에 대해
          // 갈 수 있는 각 경로에 대한 값을 의미한다
          // (9의 경우 11 방향으로 진행하게 되면 최종적으로 3이 리턴되는 것이다)
          arrForMaxValue.push(count);
        }
      }
    }

    // arrForMaxValue만 하지 않고 count까지 최댓값에 비교를 하는 이유는
    // 더이상 갈 곳 이 없는 좌표 (14 ,16)의 경우 그 어떠한 연산도
    // 진행하지 않고 여기로 오기 때문에 이럴때 dfs의 전역으로 사용한
    // 1을 넣어주기 위해 사용한다 (아무곳도 못 가면 1을 넣어야 함)
    let maxValue = Math.max(...arrForMaxValue, count);
    memoizationMap[x][y] = maxValue;
    return maxValue;
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!memoizationMap[i][j]) dfs(i, j);
    }
  }

  let result = [];
  for (let i of memoizationMap) {
    result.push(Math.max(...i));
  }

  console.log(Math.max(...result));

  process.exit();
});
