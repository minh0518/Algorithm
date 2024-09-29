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
  const info = data.map((i) => i.split(' ').map(Number));
  info.sort((a, b) => {
    if (a[1] === b[1]) return a[2] - b[2];
    return a[1] - b[1];
  });

  const search = (target, arr) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = arr[mid];

      if (midValue >= target) {
        right = mid - 1;
      }
      if (midValue < target) {
        left = mid + 1;
      }
    }
    return left;
  };

  // 각 강의의 종료시간을 오름차순 순서로 담는 배열
  const room = [info[0][2]];

  // 현재 강의실을 사용하고 있는 강의들(room) 중에서, 가장 먼저 끝나는 시간을 가리키는 인덱스
  let index = 0;

  let count = 1;
  for (let i = 1; i < N; i++) {
    const [_, start, end] = info[i];

    // 이분탐색으로 오름차순을 위한 인덱스를 파악
    const targetIndex = search(end, room);
    // 해당 인덱스에 삽입
    room.splice(targetIndex, 0, end);

    const minValue = room[index];

    if (minValue <= start) {
      // 최솟값 갱신
      index += 1;
      continue;
    }
    count += 1;
  }
  console.log(count);

  process.exit();
});
