const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // N개의 원판 , M개의 숫자 , T번 회전
  let [N, M, T] = data.shift().split(' ').map(Number);

  let tmp = data.map((i) => i.split(' ').map(Number));

  // N개의 원판에 적힌 숫자
  let circleNumber = tmp.slice(0, N);

  // 회전 정보 ([0]배수의 원판들을 , [1]방향으로 , [2]칸 회전)
  let rotateInfo = tmp.slice(N);




  // 회전 함수
  const rotate = (circleNumber, direction, times) => {
    let copyArr = [...circleNumber];

    // 시계 방향
    if (direction === 0) {
      copyArr.map((i, index) => {
        let nextIndex = (index + times) % M;
        circleNumber[nextIndex] = i;
      });
    }

    // 반시계 방향
    if (direction === 1) {
      copyArr.map((i, index) => {
        let nextIndex = index - times;
        if (nextIndex < 0) {
          nextIndex = M - Math.abs(nextIndex);
        }
        circleNumber[nextIndex] = i;
      });
    }
  };

  // 인접한 숫자를 찾는 그래프 탐색
  let visitedForEachRotate = [];
  const dfs = (x, y, targetNumber) => {
    circleNumber[x][y] = 'x';
    visitedForEachRotate.push(targetNumber);

    let [dx, dy] = [
      [-1, 1, 0, 0],
      [0, 0, -1, 1],
    ];

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (ny === -1) {
        // 왼쪽으로 이동해서 반대편으로
        ny = M - 1;
      }
      if (ny === M) {
        // 오른쪽으로 이동해서 반대편으로
        ny = 0;
      }

      if (
        nx >= 0 &&
        nx < N &&
        ny >= 0 &&
        ny < M &&
        circleNumber[nx][ny] === targetNumber
      ) {
        dfs(nx, ny, targetNumber);
      }
    }
  };

  // 평균과 비교해서 변경해주는 함수
  const change = (total) => {
    let count = 0;
    circleNumber.forEach((i) => {
      i.forEach((j) => {
        if (j !== 'x') count += 1;
      });
    });

    let avg = total / count;

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < M; y++) {
        if (circleNumber[x][y] !== 'x' && circleNumber[x][y] > avg) {
          circleNumber[x][y] -= 1;
        } else if (circleNumber[x][y] !== 'x' && circleNumber[x][y] < avg) {
          circleNumber[x][y] += 1;
        }
      }
    }
  };



  // 메인 로직
  let result = [];
  for (let i = 0; i < T; i++) {
    // 남은 원판중에서 x를 제외한 전체 합
    let totalOfOriginCircle = circleNumber
      .map((i) => {
        return i.filter((i) => {
          return i !== 'x';
        });
      })
      .map((i) => {
        return i.reduce((a, b) => a + b, 0);
      })
      .reduce((a, b) => a + b, 0);

    // 원판회전을 한번 할 때마다 계산된 인접한 숫자들의 합
    let sumForEachRotate = 0;

    let [target, direction, times] = rotateInfo[i];

    // 회전
    for (let j = target; j <= N; j += target) {
      rotate(circleNumber[j - 1], direction, times);
    }

    // 원판 탐색
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < M; y++) {
        if (circleNumber[x][y] !== 'x') {
          let targetNumber = circleNumber[x][y];
          // 그래프 탐색
          dfs(x, y, targetNumber);

          if (visitedForEachRotate.length === 1) {
            circleNumber[x][y] = targetNumber;
            visitedForEachRotate = [];
          } else {
            sumForEachRotate += visitedForEachRotate.reduce((a, b) => a + b, 0);
            visitedForEachRotate = [];
          }
        }
      }
    }

    // 인접한 숫자들이 없다면 평균값을 기반으로 변경
    if (sumForEachRotate === 0) {
      change(totalOfOriginCircle);
    }
    let leftTotalValue = totalOfOriginCircle - sumForEachRotate;

    result.push(leftTotalValue);
  }

  console.log(result[result.length - 1]);

  process.exit();
});
