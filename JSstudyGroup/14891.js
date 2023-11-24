const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const wheelInfo = data.slice(0, 4).map((i) => i.split('').map(Number));
  const K = Number(data[4]);
  const rotateInfo = data.slice(5).map((i) => i.split(' ').map(Number));

  for (let [index, dir] of rotateInfo) {
    index -= 1;

    // 현재 회전하는 바퀴 기준 왼쪽과 오른쪽 분리
    let leftStartIndex = index - 1;
    let rightStratIndex = index + 1;

    const info = new Map();

    // 왼쪽의 모든 바퀴들의 회전 여부 확인
    if (leftStartIndex >= 0) {
      let currentDir = dir;
      // 회전이 전파되는 방향이 중요하므로 left는 줄여가면서 진행
      for (let i = leftStartIndex; i >= 0; i--) {
        // i+1부터 해야 현재 회전하는 바퀴랑 비교가 가능
        if (wheelInfo[i + 1][6] !== wheelInfo[i][2]) {
          info.set(i, currentDir === 1 ? -1 : 1); // 회전이 되는 바퀴의 인덱스 기록
        }
        if (wheelInfo[i + 1][6] === wheelInfo[i][2]) {
          break;
        }
        // 회전이 전파되면, 회전 방향을 변경
        currentDir = currentDir === 1 ? -1 : 1;
      }
    }
    // 오른쪽의 모든 바퀴들의 회전 여부 확인
    if (rightStratIndex <= 3) {
      let currentDir = dir;
      // 회전이 전파되는 방향이 중요하므로 right는 늘려가면서 진행
      for (let i = rightStratIndex; i <= 3; i++) {
        // i-1부터 해야 현재 회전하는 바퀴랑 비교가 가능
        if (wheelInfo[i - 1][2] !== wheelInfo[i][6]) {
          info.set(i, currentDir === 1 ? -1 : 1); // 회전이 되는 바퀴의 인덱스 기록
        }
        if (wheelInfo[i - 1][2] === wheelInfo[i][6]) {
          break;
        }
        // 회전이 전파되면, 회전 방향을 변경
        currentDir = currentDir === 1 ? -1 : 1;
      }
    }

    // 회전이 되는 바퀴의 인덱스 기록을 기반으로
    // 연결된 부분들을 회전
    for (let [wheelIndex, toDir] of info) {
      // 시계방향
      if (toDir === 1) {
        // 배열의 모든 요소를 앞으로 전진
        const lastValue = wheelInfo[wheelIndex].pop();
        wheelInfo[wheelIndex].unshift(lastValue);
      }
      // 반시계방향
      if (toDir === -1) {
        // 배열의 모든 요소를 뒤로 후진
        const firstValue = wheelInfo[wheelIndex].shift();
        wheelInfo[wheelIndex].push(firstValue);
      }
    }
    // 현재 회전하는 바퀴도 회전
    if (dir === 1) {
      const lastValue = wheelInfo[index].pop();
      wheelInfo[index].unshift(lastValue);
    }
    if (dir === -1) {
      const firstValue = wheelInfo[index].shift();
      wheelInfo[index].push(firstValue);
    }
  }
  console.log(
    wheelInfo
      .map((i, index) => {
        if (i[0] === 0) return 0;
        if (i[0] === 1) return 2 ** index;
      })
      .reduce((a, b) => a + b),
  );

  process.exit();
});
