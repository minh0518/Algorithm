// 24.1.14
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, L] = data.shift().split(' ').map(Number);
  const board = data.map((i) => i.split(' ').map(Number));

  const check = (arr) => {
    if (new Set(arr).size === 1) return true;

    // 현재 경사로가 설치돼있는 인덱스
    const installedIndex = [];
    // 기준 높이
    let standardHeight = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === standardHeight) continue;

      // 차가 1보다 클 경우 false
      if (Math.abs(arr[i] - standardHeight) > 1) return false;

      let sliced;

      // 기준 높이보다 현재 높이가 더 높을경우 (2 2 2 [3] 3)
      if (standardHeight < arr[i]) {
        if (i - L < 0) return false; // 앞부분에서 L만큼 자르기 위한 범위가 부족할 경우
        const from = i - L;
        const to = i;
        sliced = arr.slice(from, to);
        for (let index = from; index < to; index++) {
          if (installedIndex.includes(index)) return false; // 이미 설치돼있는 경우에 또 설치를 해야 한다면
          installedIndex.push(index);
        }
      }

      // 기준 높이보다 현재 높이가 더 낮을경우 (3 3 3 [2] 2)
      if (standardHeight > arr[i]) {
        if (i - 1 + L >= N) return false; // 뒷부분에서 L만큼 자르기 위한 범위가 부족할 경우
        const from = i;
        const to = i + L;
        sliced = arr.slice(from, to);
        for (let index = from; index < to; index++) {
          if (installedIndex.includes(index)) return false; // 이미 설치돼있는 경우에 또 설치를 해야 한다면
          installedIndex.push(index);
        }
      }

      if (new Set(sliced).size === 1) {
        standardHeight = arr[i];
      } else {
        return false; // L만큼 자른 블록의 높이가 일관되지 않다면
      }
    }

    return true;
  };

  let rseult = 0;
  for (let i = 0; i < N; i++) {
    const arr = board[i];
    if (check(arr)) rseult += 1;
  }

  for (let i = 0; i < N; i++) {
    const arr = [];
    for (let j = 0; j < N; j++) {
      arr.push(board[j][i]);
    }
    if (check(arr)) rseult += 1;
  }

  console.log(rseult);

  process.exit();
});
