const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // 문제에서 주어진 것은 함수좌표이므로 행렬 기준으로는 y,x이다
  // 문제에서 주어진 4 2 > 행렬좌표로 2 4

  // 함수에서 y좌표가 줄어드는 것(=위로 이동) >> 행렬 x좌표가 들어듬
  // 함수에서 x좌표가 줄어드는 것(=왼쪽 이동) >> 행렬 y좌표가 들어듬

  // 즉, 실제로 [0,0]에서 x:0 , y:+1 이 된다면 함수좌표로는 [0,1]이겠지만
  // 여기선 [1,0]이 되는 것이다

  let MAX_SIZE = 101;
  // let MAX_SIZE = 6;

  let N = +data.shift();
  let info = data.map((i) => i.split(' ').map(Number));

  let map = new Array(MAX_SIZE).fill().map(() => new Array(MAX_SIZE).fill(0));

  const makeGraph = (arr, graphNum) => {
    let [x, y, dir, gen] = arr;

    // 0: x좌표가 증가하는 방향 (→)
    if (dir === 0) {
      let trace = [];

      if (gen === 0) {
        // 0세대
        map[y][x] = graphNum;
        map[y][x + 1] = graphNum;
      }
      if (gen === 1) {
        // 1세대
        map[y][x] = graphNum;
        map[y][x + 1] = graphNum;
        map[y - 1][x + 1] = graphNum;
      }
      if (gen >= 2) {
        map[y][x] = graphNum;
        map[y][x + 1] = graphNum;
        map[y - 1][x + 1] = graphNum;

        let currentGen = 1;

        trace.push([0, 1], [-1, 0]);
        trace.reverse();
        y = y - 1;
        x = x + 1;
        while (currentGen !== gen) {
          let newTrace = [];
          let length = trace.length;

          for (let i = 0; i < length; i++) {
            if ((i + 1) % 2 === 0) {
              let ny = trace[i][1] === 0 ? 0 : -trace[i][1];
              let nx = trace[i][0] === 0 ? 0 : -trace[i][0];
              newTrace.push([ny, nx]);
            }
            if ((i + 1) % 2 === 1) {
              let ny = trace[i][1];
              let nx = trace[i][0];
              newTrace.push([ny, nx]);
            }
          }

          for (let i of newTrace) {
            let ny = y + i[0];
            let nx = x + i[1];

            map[ny][nx] = graphNum;
            y = ny;
            x = nx;
          }

          newTrace.reverse();
          trace.unshift(...newTrace);
          currentGen += 1;
        }
      }
    }

    // 1: y좌표가 감소하는 방향 (↑)
    if (dir === 1) {
      let trace = [];

      if (gen === 0) {
        // 0세대
        map[y][x] = graphNum;
        map[y - 1][x] = graphNum;
      }
      if (gen === 1) {
        // 0세대
        map[y][x] = graphNum;
        map[y - 1][x] = graphNum;
        // 1세대 (0세대 마지막 좌표 기준으로 x좌표만 -1)
        // map[y - 1][x] = graphNum; >> 이건 시작점에서부터 x좌표만 -1 하는것이므로 틀림
        map[y - 1][x - 1] = graphNum;
      }
      if (gen >= 2) {
        map[y][x] = graphNum;
        map[y - 1][x] = graphNum;
        map[y - 1][x - 1] = graphNum;

        let currentGen = 1;

        // 0~1세대까지 이동한 기록
        trace.push([-1, 0], [0, -1]);

        // 마지막 이동 기록부터 역순으로 다음 좌표들을 계산하므로
        trace.reverse();

        // 1세대 마지막 좌표에 이어서 진행해야 하니까 좌표 수정
        y = y - 1;
        x = x - 1;

        // 2세대부터 진행
        while (currentGen !== gen) {
          // 각 세대별로 추가적으로 진행되는 좌표들을 담는 배열
          // (한 세대 계산이 끝나면 trace 배열에 추가가 됨)
          let newTrace = [];

          let length = trace.length;

          for (let i = 0; i < length; i++) {
            // 홀수번째는 부호 반대 + y,x 위치 변경 (첫번째도 홀수이다)
            if ((i + 1) % 2 === 1) {
              let ny = trace[i][1] === 0 ? 0 : -trace[i][1];
              let nx = trace[i][0] === 0 ? 0 : -trace[i][0];
              newTrace.push([ny, nx]);
            }

            // 짝수번째는 y,x 위치만 변경
            if ((i + 1) % 2 === 0) {
              let ny = trace[i][1];
              let nx = trace[i][0];
              newTrace.push([ny, nx]);
            }
          }

          // newTrace를 기반으로 그림 그리기
          for (let i of newTrace) {
            let ny = y + i[0];
            let nx = x + i[1];

            map[ny][nx] = graphNum;

            // 매 그림마다 좌표를 최신화 해줘야 한다
            y = ny;
            x = nx;
          }

          // 마지막 이동 기록부터 역순으로 다음 좌표들을 계산하니까
          newTrace.reverse();

          // trace 앞에다가 역순으로 바꾼 newTrace를 넣어줌
          trace.unshift(...newTrace);
          currentGen += 1;
        }
      }
    }

    // 2: x좌표가 감소하는 방향 (←)
    if (dir === 2) {
      let trace = [];

      if (gen === 0) {
        map[y][x] = graphNum;
        map[y][x - 1] = graphNum;
      }
      if (gen === 1) {
        map[y][x] = graphNum;
        map[y][x - 1] = graphNum;
        map[y + 1][x - 1] = graphNum;
      }
      if (gen >= 2) {
        map[y][x] = graphNum;
        map[y][x - 1] = graphNum;
        map[y + 1][x - 1] = graphNum;
        let currentGen = 1;

        trace.push([0, -1], [1, 0]);

        trace.reverse();

        y = y + 1;
        x = x - 1;
        while (currentGen !== gen) {
          let newTrace = [];
          let length = trace.length;

          for (let i = 0; i < length; i++) {
            if ((i + 1) % 2 === 0) {
              let ny = trace[i][1] === 0 ? 0 : -trace[i][1];
              let nx = trace[i][0] === 0 ? 0 : -trace[i][0];
              newTrace.push([ny, nx]);
            }

            if ((i + 1) % 2 === 1) {
              let ny = trace[i][1];
              let nx = trace[i][0];
              newTrace.push([ny, nx]);
            }
          }

          for (let i of newTrace) {
            let ny = y + i[0];
            let nx = x + i[1];

            map[ny][nx] = graphNum;
            y = ny;
            x = nx;
          }

          newTrace.reverse();
          trace.unshift(...newTrace);
          currentGen += 1;
        }
      }
    }

    // 3: y좌표가 증가하는 방향 (↓)
    if (dir === 3) {
      let trace = [];

      if (gen === 0) {
        map[y][x] = graphNum;
        map[y + 1][x] = graphNum;
      }
      if (gen === 1) {
        map[y][x] = graphNum;
        map[y + 1][x] = graphNum;
        map[y + 1][x + 1] = graphNum;
      }
      if (gen >= 2) {
        map[y][x] = graphNum;
        map[y + 1][x] = graphNum;
        map[y + 1][x + 1] = graphNum;

        let currentGen = 1;
        trace.push([1, 0], [0, 1]);

        trace.reverse();

        y = y + 1;
        x = x + 1;
        while (currentGen !== gen) {
          let newTrace = [];
          let length = trace.length;

          for (let i = 0; i < length; i++) {
            if ((i + 1) % 2 === 1) {
              let ny = trace[i][1] === 0 ? 0 : -trace[i][1];
              let nx = trace[i][0] === 0 ? 0 : -trace[i][0];
              newTrace.push([ny, nx]);
            }

            if ((i + 1) % 2 === 0) {
              let ny = trace[i][1];
              let nx = trace[i][0];
              newTrace.push([ny, nx]);
            }
          }

          for (let i of newTrace) {
            let ny = y + i[0];
            let nx = x + i[1];

            map[ny][nx] = graphNum;
            y = ny;
            x = nx;
          }

          newTrace.reverse();
          trace.unshift(...newTrace);
          currentGen += 1;
        }
      }
    }
  };

  info.forEach((i, index) => {
    makeGraph(i, index + 1);
  });

  let count = 0;
  for (let i = 0; i < MAX_SIZE - 1; i++) {
    for (let j = 0; j < MAX_SIZE - 1; j++) {
      if (map[i][j] === 0) continue;

      if (map[i + 1][j + 1] !== 0 && map[i + 1][j] !== 0 && map[i][j + 1] !== 0) {
        count += 1;
      }
    }
  }

  console.log(count);

  process.exit();
});

// [
//   [ 3, 3, 0, 1 ],
//   [ 4, 2, 1, 3 ],
//   [ 4, 2, 2, 1 ]
// ]

// 시작x , 시작y , 시작방향 , 세대
// 0: x좌표가 증가하는 방향 (→)
// 1: y좌표가 감소하는 방향 (↑)
// 2: x좌표가 감소하는 방향 (←)
// 3: y좌표가 증가하는 방향 (↓)
