const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, K] = data.shift().split(' ').map(Number);
  const beltArr = data.shift().split(' ').map(Number);
  const START_INDEX = 0;

  const robotInfo = new Array(N).fill(false);

  const rotate = (beltArr, robotInfo) => {
    // 벨트 움직임
    beltArr.unshift(beltArr.pop());

    // 벨트가 움직임으로써 로봇의 위치도 움직임
    robotInfo.unshift(robotInfo.pop());

    // 마지막 로봇 즉시 제거
    if (robotInfo[robotInfo.length - 1] === true) {
      robotInfo[robotInfo.length - 1] = false;
    }
  };

  const moveRobot = (beltArr, robotInfo) => {
    // 맨 끝에서부터 두번째까지 순회
    for (let i = robotInfo.length - 1; i >= 1; i--) {
      // 현재 인덱스(이동하고자 하는 목표 위치)의 내구도가 1이상 &&
      // 현재 인덱스에 대한 로봇값이false &&
      // 이전 인덱스에 대한 로봇값이 true
      if (beltArr[i] > 0 && robotInfo[i] === false && robotInfo[i - 1] === true) {
        beltArr[i] -= 1;
        if (beltArr[i] === 0) zeroCount += 1;
        robotInfo[i - 1] = false;
        robotInfo[i] = true;
      }
    }

    // 마지막 로봇 즉시 제거
    if (robotInfo[robotInfo.length - 1] === true) {
      robotInfo[robotInfo.length - 1] = false;
    }
  };

  let count = 0;
  let zeroCount = 0;

  // 메인 로직
  while (zeroCount < K) {
    count += 1;
    // 회전
    rotate(beltArr, robotInfo);

    // 로봇 이동
    moveRobot(beltArr, robotInfo);

    // 로봇 추가
    if (beltArr[START_INDEX] <= 0) continue;
    beltArr[START_INDEX] -= 1;
    if (beltArr[START_INDEX] === 0) zeroCount += 1;
    robotInfo[START_INDEX] = true;
  }
  console.log(count);

  process.exit();
});
