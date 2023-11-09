const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // 9층까지, 1개자리수, 바꾸는 LED수, 현재 층수
  const [N, K, P, X] = data.shift().split(' ').map(Number);

  const EACH_NUM_LENGTH = 7;

  const numberInfo = [
    '1110111',
    '0010010',
    '1011101',
    '1011011',
    '0111010',
    '1101011',
    '1101111',
    '1010010',
    '1111111',
    '1111011',
  ];

  // 층 번호를 LED디스플레이 문자열로 변환하는 함수
  const convertDisplayInfo = (floorArr) => {
    let convertResult = '';
    for (let num of floorArr) {
      convertResult += numberInfo[num];
    }

    return convertResult;
  };

  // 2개의 층에서 서로 반전된 LED의 차이를 반환하는 함수
  const getDiffCount = (target, origin) => {
    let count = 0;
    for (let i = 0; i < K * EACH_NUM_LENGTH; i++) {
      if (target[i] !== origin[i]) count += 1;
    }

    return count;
  };

  // X층
  const currentFloorArr = String(X).split('').map(Number);
  while (currentFloorArr.length !== K) currentFloorArr.unshift(0);
  const currentFloorDisplayStr = convertDisplayInfo(currentFloorArr);

  let result = 0;

  // 1층부터 N층까지 직접 순회하며 모든 층에 대한 경우를 비교
  for (let floor = 1; floor <= N; floor++) {
    if (floor === X) continue;

    const floorArr = String(floor).split('').map(Number);

    // ex) 3자리수 표기, floor는 7 >> 007
    if (floorArr.length !== K) {
      while (floorArr.length !== K) floorArr.unshift(0);
    }

    const displayStr = convertDisplayInfo(floorArr);

    //  floor, X층간의 반전된 LED 갯수 확인
    const diffCount = getDiffCount(displayStr, currentFloorDisplayStr);

    if (diffCount <= P) result += 1;
  }

  console.log(result);

  process.exit();
});
