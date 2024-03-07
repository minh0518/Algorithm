// 24.3.7
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M, L] = data.shift().split(' ').map(Number);
  const arr = data.shift().split(' ').map(Number);
  arr.unshift(0);
  arr.push(L);
  arr.sort((a, b) => a - b);

  // 현재 휴게소들을 기반으로 한 간격들을 담는 배열
  const gap = [];
  for (let i = 0; i < arr.length - 1; i++) {
    gap.push(arr[i + 1] - arr[i]);
  }

  // 최소 간격
  let left = 1;
  // 최대 간격(현재 휴게소 중 최대 간격)
  let right = Math.max(...gap);

  while (left <= right) {
    // 현재 간격을 mid로 했을 때 추가로 세울 수 있는 휴게소 갯수 탐색
    const mid = Math.floor((left + right) / 2);
    let newCount = 0;

    for (let i of gap) {
      if (i < mid) continue;
      const count = i / mid;
      let floorCount = Math.floor(i / mid);
      if (count === floorCount) {
        // 간격이 200일 때 mid가 100이면(=정확히 소수점 없이 나누어 떨어질 때)
        // 휴개소의 갯수는 2가 아닌 1이 돼야 하므로 -1
        floorCount -= 1;
      }
      newCount += floorCount;
    }

    // 간격을 늘려야 함
    if (newCount > M) {
      left = mid + 1;
    }
    // 간격을 줄여야 함
    if (newCount <= M) {
      right = mid - 1;
    }
  }

  console.log(left);

  process.exit();
});
