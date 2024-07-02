const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // N: 0 , S: 1
  // 1: 시계 , -1: 반시계

  const wheels = data.slice(0, 4).map((i) => i.split('').map(Number));
  const K = data[4];
  const rotateInfo = data.slice(5).map((i) => i.split(' ').map(Number));
  const WHEELS_COUNT = 4;
  const CONTECT_INDEX = [2, 6];

  const getStatus = () => {
    // [0]: 1,2번 톱니바퀴 연결정보 (true:회전, false:고정)
    // [1]: 2,3번 톱니바퀴 연결정보
    // [2]: 3,4번 톱니바퀴 연결정보
    const status = [];
    for (let i = 0; i < WHEELS_COUNT - 1; i++) {
      const current = wheels[i];
      const next = wheels[i + 1];
      if (current[CONTECT_INDEX[0]] === next[CONTECT_INDEX[1]]) {
        status.push(false);
        continue;
      }
      status.push(true);
    }
    return status;
  };

  const rotateOtherWheels = (status, wheelNumber, dir) => {
    const clockWise = (arr) => {
      arr.unshift(arr.pop()); // 시계방향 회전
    };
    const unClockWise = (arr) => {
      arr.push(arr.shift()); // 반시계방향 회전
    };

    // 선택된 톱니바퀴 방향으로 기준으로
    // 전체 4개의 톱니바퀴 회전 방향 파악
    let dirInfo;
    if (wheelNumber % 2 === 0) dirInfo = [dir, -dir, dir, -dir];
    if (wheelNumber % 2 === 1) dirInfo = [-dir, dir, -dir, dir];

    // 현재 톱니바퀴 기준 오른쪽 방향으로 회전
    for (let i = wheelNumber + 1; i < WHEELS_COUNT; i++) {
      if (status[i - 1]) {
        if (dirInfo[i] === 1) clockWise(wheels[i]);
        if (dirInfo[i] === -1) unClockWise(wheels[i]);
      } else break;
    }
    // 현재 톱니바퀴 기준 왼쪽 방향으로 회전
    for (let i = wheelNumber - 1; i >= 0; i--) {
      if (status[i]) {
        if (dirInfo[i] === 1) clockWise(wheels[i]);
        if (dirInfo[i] === -1) unClockWise(wheels[i]);
      } else break;
    }
  };

  // 메인 로직
  for (let [wheelNumber, dir] of rotateInfo) {
    wheelNumber -= 1; // 인덱스로 사용
    const currentWheel = wheels[wheelNumber];

    // 톱니바퀴 연결에 따른 회전 가능 유무 파악
    const status = getStatus();

    // 현재 톱니바퀴 회전
    if (dir === 1) currentWheel.unshift(currentWheel.pop());
    if (dir === -1) currentWheel.push(currentWheel.shift());

    // 연결된 톱니바퀴 회전
    rotateOtherWheels(status, wheelNumber, dir);
  }

  // 정답 덧셈
  console.log(
    wheels
      .map((wheel, index) => {
        if (wheel[0] === 0) return 0;
        if (wheel[0] === 1) return Math.pow(2, index);
      })
      .reduce((a, b) => a + b),
  );

  process.exit();
});
