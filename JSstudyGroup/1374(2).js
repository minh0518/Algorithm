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

  const room = [info[0][2]];
  for (let i = 1; i < N; i++) {
    const [_, start, end] = info[i];

    let targetIndex;
    for (let j = 0; j < room.length; j++) {
      // 현재 강의의 시작시간보다 기존 강의의 종료시간이 더 이른 경우
      // 해당 강의실을 사용
      if (room[j] <= start) {
        targetIndex = j;
        break;
      }
    }
    if (targetIndex !== undefined) {
      room[targetIndex] = end;
    } else {
      room.push(end);
    }
  }
  console.log(room.length);

  process.exit();
});
