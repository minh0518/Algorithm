const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M, T] = data.shift().split(' ').map(Number);
  const circleInfo = data.slice(0, N).map((i) => i.split(' ').map(Number));
  const rotateInfo = data.slice(N).map((i) => i.split(' ').map(Number));

  const rotateClockWise = (arr) => {
    const rotateArr = [];
    const start = M - 1;
    for (let i = start; i < start + M; i++) {
      rotateArr.push(arr[i % M]);
    }
    return rotateArr;
  };
  const rotateUnClockWise = (arr) => {
    const rotateArr = [];
    const start = 1;
    for (let i = start; i < M + 1; i++) {
      rotateArr.push(arr[i % M]);
    }
    return rotateArr;
  };

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  // bfs로 인접한 부분 변경
  const bfs = (circleArr, x, y) => {
    let flag = false;
    const queue = [];
    queue.push([x, y]);
    const target = circleArr[x][y];

    while (queue.length) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        // 상하는 범위를 나간거고 좌우는 서로 연결
        if (nx < 0 || nx >= N || circleArr[nx][ny] === 'X') continue;
        if (ny === -1) ny = M - 1;
        if (ny === M) ny = 0;

        if (circleArr[nx][ny] === target) {
          flag = true;
          circleArr[nx][ny] = 'X';
          queue.push([nx, ny]);
        }
      }
    }

    // 변경 여부
    return flag;
  };

  // 전체 합
  const getAdd = (circleInfo) => {
    return circleInfo
      .map((row) => {
        const filteredArr = row.filter((col) => col !== 'X');

        if (!filteredArr.length) return 0;
        return filteredArr.reduce((a, b) => a + b);
      })
      .reduce((a, b) => a + b);
  };

  // 메인 로직
  for (let [x, d, k] of rotateInfo) {
    let changeFlag = false;

    // 회전
    for (let i = 0; i < circleInfo.length; i++) {
      if ((i + 1) % x !== 0) continue;

      let target = [...circleInfo[i]];

      if (d === 0) {
        let count = 0;
        while (count !== k) {
          target = rotateClockWise(target);
          count += 1;
        }
        circleInfo[i] = target;
      }
      if (d === 1) {
        let count = 0;
        while (count !== k) {
          target = rotateUnClockWise(target);
          count += 1;
        }
        circleInfo[i] = target;
      }
    }

    // 인접 부분 탐색
    for (let i = 0; i < circleInfo.length; i++) {
      for (let j = 0; j < circleInfo[i].length; j++) {
        if (circleInfo[i][j] === 'X') continue;

        // 얕은 복사
        if (bfs(circleInfo, i, j)) changeFlag = true;
      }
    }

    if (changeFlag) continue;

    // X로 변경한 부분이 없을 시, 평균값을 기반으로 수정
    const addResult = getAdd(circleInfo);
    const existCount = circleInfo.map((row) => row.filter((col) => col !== 'X').length).reduce((a, b) => a + b);
    const average = addResult / existCount;

    for (let i = 0; i < circleInfo.length; i++) {
      for (let j = 0; j < circleInfo[i].length; j++) {
        if (circleInfo[i][j] > average) {
          circleInfo[i][j] -= 1;
        } else if (circleInfo[i][j] < average) circleInfo[i][j] += 1;
      }
    }
  }

  console.log(getAdd(circleInfo));

  process.exit();
});
