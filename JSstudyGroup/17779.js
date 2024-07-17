const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();
  const info = data.map((row) => row.split(' ').map(Number));

  // 선거구 시뮬레이션 함수
  const simulation = (x, y, d1, d2) => {
    // 5번 선거구를 먼저 판별
    const five = new Array(N).fill(undefined).map(() => new Array(N).fill(0));
    let leftIndex = y - d1;
    let rightIndex = y + d2;
    for (let r = x; r <= x + d1 + d2; r++) {
      const depth = r - x;
      const left = depth > d1 ? ++leftIndex : y - depth;
      const right = depth > d2 ? --rightIndex : y + depth;
      for (let c = left; c <= right; c++) {
        five[r][c] = info[r][c];
      }
    }

    // 1~4번 선거구 판별
    const sumArr = new Array(4).fill(0);
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        // 5번 선거구가 있는 좌표라면 continue
        if (five[r][c]) continue;

        if (r < x + d1 && c <= y) {
          sumArr[0] += info[r][c];
          continue;
        }
        if (r <= x + d2 && c > y) {
          sumArr[1] += info[r][c];
          continue;
        }
        if (x + d1 <= r && c < y - d1 + d2) {
          sumArr[2] += info[r][c];
          continue;
        }
        if (x + d2 < r && y - d1 + d2 <= c) {
          sumArr[3] += info[r][c];
          continue;
        }
      }
    }

    sumArr.push(five.reduce((acc, val) => acc + val.reduce((a, b) => a + b), 0));
    sumArr.sort((a, b) => b - a);
    return sumArr[0] - sumArr.at(-1);
  };

  // 메인 로직
  let minValue = Infinity;
  for (let i = 0; i < N - 2; i++) {
    for (let j = 1; j < N - 1; j++) {
      for (let d1 = 1; d1 < N; d1++) {
        for (let d2 = 1; d2 < N; d2++) {
          // 선거구를 만들 수 있는 범위가 아니라면 패스
          if (i + d1 + d2 >= N || j - d1 < 0 || j - d1 >= j || j + d2 >= N) continue;

          // 시뮬레이션
          const gap = simulation(i, j, d1, d2);
          if (minValue > gap) minValue = gap;
        }
      }
    }
  }

  console.log(minValue);

  process.exit();
});
