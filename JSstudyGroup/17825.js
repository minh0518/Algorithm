const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const diceInfo = data.shift().split(' ').map(Number);

  // 기본 코스(시작 ~ 38)
  const board = new Array(20).fill(undefined).map((_, index) => {
    if (index * 2 === 10 || index * 2 === 20 || index * 2 === 30) return 0;
    return index * 2;
  });
  board.push(0);

  board.push(10, 13, 16, 19, 0); // 10 코스(10 ~ 19)
  board.push(20, 22, 24, 0); // 20코스(20 ~ 24)
  board.push(30, 28, 27, 26, 0); // 30코스(30 ~ 26)
  board.push(25, 30, 35, 40, 0); // 25코스(25 ~ 도착)

  // 기본 코스 마지막 인덱스(38)
  const NORMAL_END = 19;

  // 기본 코스에서 10, 20, 30 40이 시작되는 지점
  // 기본 코스에서 아래 좌표에 도착하면 시작지점을 옮겨줘야 한다
  const SPECIAL_SCORE_START = [5, 10, 15, 20];
  console.log(board);

  const SPECIAL_INDEX = [
    // 10 ~ 25(0값)
    [21, 25],
    // 20 ~ 25(0값)
    [26, 29],
    // 30 ~ 25(0값)
    [30, 34],
    // 25 ~ 도착(0값)
    [35, 39],
  ];

  let maxValue = 0;
  const dfs = (playerCord, diceIndex, score) => {
    if (diceIndex === 10) {
      if (maxValue < score) maxValue = score;
      return;
    }

    const currentDice = diceInfo[diceIndex];

    for (let playerIndex = 0; playerIndex < 4; playerIndex++) {
      // 말 선택
      const currentPlayerCord = playerCord[playerIndex];
      if (currentPlayerCord === 'x') continue;

      // 선택 된 말의 다음 좌표
      let nextCord = currentPlayerCord + currentDice;

      // 도착 플래그
      let endFlag = false;

      // 일반 코스
      if (currentPlayerCord <= NORMAL_END) {
        // 일반 코스에서 끝에 도착했을 경우
        if (nextCord >= NORMAL_END + 2) {
          endFlag = true;
        }

        // 일반 코스에서 10, 20, 30 코스에 진입했을 경우
        // 각 코스의 시작좌표로 이동
        if (nextCord === SPECIAL_SCORE_START[0]) {
          nextCord = SPECIAL_INDEX[0][0];
        }
        if (nextCord === SPECIAL_SCORE_START[1]) {
          nextCord = SPECIAL_INDEX[1][0];
        }
        if (nextCord === SPECIAL_SCORE_START[2]) {
          nextCord = SPECIAL_INDEX[2][0];
        }

        // 일반 코스에서 마지막 40으로 간 경우
        if (nextCord === SPECIAL_SCORE_START[3]) {
          // 40좌표로 이동
          nextCord = SPECIAL_INDEX[3][1] - 1;
        }
      }

      // 10, 20, 30, 25 코스
      else {
        let gapFrom25 = 0; // 기존 코스에서 25를 넘어선 차잇값
        // 10코스 -> 25코스로 넘어갔을 때
        if (
          currentPlayerCord >= SPECIAL_INDEX[0][0] &&
          currentPlayerCord < SPECIAL_INDEX[0][1] &&
          nextCord >= SPECIAL_INDEX[0][1]
        ) {
          // 10 -> 25코스로 넘어갈 때 초과한 만큼, 25코스 좌표에서 이동
          gapFrom25 = nextCord - SPECIAL_INDEX[0][1];
          nextCord = SPECIAL_INDEX[3][0] + gapFrom25;
        }

        // 20코스 -> 25코스로 넘어갔을 때
        if (
          currentPlayerCord >= SPECIAL_INDEX[1][0] &&
          currentPlayerCord < SPECIAL_INDEX[1][1] &&
          nextCord >= SPECIAL_INDEX[1][1]
        ) {
          gapFrom25 = nextCord - SPECIAL_INDEX[1][1];
          nextCord = SPECIAL_INDEX[3][0] + gapFrom25;
        }

        // 30코스 -> 25코스로 넘어갔을 때
        if (
          currentPlayerCord >= SPECIAL_INDEX[2][0] &&
          currentPlayerCord < SPECIAL_INDEX[2][1] &&
          nextCord >= SPECIAL_INDEX[2][1]
        ) {
          gapFrom25 = nextCord - SPECIAL_INDEX[2][1];
          nextCord = SPECIAL_INDEX[3][0] + gapFrom25;
        }

        // 최종적으로 계산된 좌표가, 도착한 좌표일 경우
        if (nextCord >= SPECIAL_INDEX[3][1]) {
          endFlag = true;
        }
      }

      // 도착한 것 제외하고, 이동할 좌표에 다른 말이 있다면 패스
      if (!endFlag && playerCord.includes(nextCord)) continue;

      // 더할 점수 계산
      const addScore = endFlag ? 0 : board[nextCord];

      // 반영
      playerCord[playerIndex] = endFlag ? 'x' : nextCord;
      score += addScore;
      dfs(playerCord, diceIndex + 1, score);
      // 백트래킹을 위한 초기화
      score -= addScore;
      playerCord[playerIndex] = currentPlayerCord;
    }
  };

  dfs([0, 0, 0, 0], 0, 0);
  console.log(maxValue);

  process.exit();
});
