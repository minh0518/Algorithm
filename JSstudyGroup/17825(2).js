const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const info = data.shift().split(' ').map(Number);

  const board = [
    // 일반 코스 (시작~38)
    [0, 2, 4, 6, 8, 0, 12, 14, 16, 18, 0, 22, 24, 26, 28, 0, 32, 34, 36, 38, 0],
    // 10 코스 (10~19)
    [10, 13, 16, 19, 0],
    // 20 코스 (20~24)
    [20, 22, 24, 0],
    // 30 코스 (30~26)
    [30, 28, 27, 26, 0],
    // 25 코스 (25~도착)
    [25, 30, 35, 40],
  ];

  // 각 코스에서 코스가 변경되거나 끝나는 인덱스 정보를 담은 객체
  const courseInfo = {
    // 일반 코스 정보
    0: {
      10: 5, // 10 코스 진입 인덱스
      20: 10,
      30: 15,
      last: 20, // 마지막 인덱스
    },
    // 10 코스 정보
    1: { last: 4 },
    // 20 코스 정보
    2: { last: 3 },
    // 30 코스 정보
    3: { last: 4 },
    // 25 코스 정보
    4: { last: 3 },
  };

  let maxValue = 0;
  const dfs = (diceIndex, score, player) => {
    if (diceIndex === 10) {
      if (maxValue < score) maxValue = score;
      return;
    }
    const currentDice = info[diceIndex];
    for (let i = 0; i < 4; i++) {
      let [currentCourse, currentCord] = player[i];

      // 백트래킹을 대한 원본 값 복사
      const originPlayer = [...player[i]];
      const originScore = score;

      // 이미 도착한 말이라면 패스
      if (currentCord === 'x') continue;

      // 현재 코스에 대한 정보
      const currentCourseInfo = courseInfo[currentCourse];

      // 다음 좌표로 이동
      currentCord += currentDice;

      // #region 코스가 변경된 경우
      // 현재 코스가 일반 코스일 때
      if (currentCourse === 0) {
        // 10 코스로 이동
        if (currentCord === currentCourseInfo['10']) {
          [currentCourse, currentCord] = [1, 0];
        }
        // 20 코스로 이동
        if (currentCord === currentCourseInfo['20']) {
          [currentCourse, currentCord] = [2, 0];
        }
        // 30 코스로 이동
        if (currentCord === currentCourseInfo['30']) {
          [currentCourse, currentCord] = [3, 0];
        }
        // 40 코스로 이동
        if (currentCord === currentCourseInfo['last']) {
          [currentCourse, currentCord] = [4, 3]; //40
        }
        // 도착했을 때
        if (currentCord > currentCourseInfo['last']) {
          [currentCourse, currentCord] = [currentCourse, 'x'];
        }
      }
      // 현재 코스가 10,20,30,25코스일 때
      else {
        // 10,20,30 코스였을 때, 25코스로 이동
        if (currentCourse === 1 || currentCourse === 2 || currentCourse === 3) {
          if (currentCord >= currentCourseInfo['last']) {
            const gap = currentCord - currentCourseInfo['last'];
            [currentCourse, currentCord] = [4, gap];
          }
        }

        // 위 if문에서 25코스로 이동했을 때 || 원래 25코스였을 때
        // 여기서 한번 더 검사
        if (currentCourse === 4) {
          if (currentCord > currentCourseInfo['last']) {
            [currentCourse, currentCord] = [currentCourse, 'x'];
          }
        }
      }
      // #endregion

      // 다음 좌표에 이미 말이 존재한다면 패스
      if (currentCord !== 'x' && player.some((i) => i.join('') === [currentCourse, currentCord].join(''))) continue;
      // 점수 반영
      if (currentCord !== 'x') score += board[currentCourse][currentCord];
      // 말 이동
      player[i] = [currentCourse, currentCord];

      dfs(diceIndex + 1, score, player);

      // 백트래킹을 위한 초기화
      player[i] = [...originPlayer];
      score = originScore;
    }
  };

  dfs(0, 0, [
    // [코스 정보,코스에서의 좌표]
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  console.log(maxValue);

  process.exit();
});
