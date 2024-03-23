const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];
rl.on('line', function (x) {
  data.push(x);
  // rl.close();
}).on('close', function () {
  // 원판 숫자, 플레이어 수, 선물, 라운드 수
  const [N, K, P, L] = data.shift().split(' ').map(Number);

  const info = data.map((i) => i.split(' ').map(Number));
  const ROW = K;
  const COL = L;

  const roundInfo = [];
  const circle = new Array(N).fill().map((_, index) => index + 1);

  for (let j = 0; j < COL; j++) {
    const currentRoundInfo = [];
    for (let i = 0; i < ROW; i++) {
      currentRoundInfo.push(info[i][j]);
    }
    roundInfo.push(currentRoundInfo);
  }

  let result = -1;
  for (let i = 0; i < roundInfo.length; i++) {
    const currentRound = roundInfo[i];
    for (let j = 0; j < currentRound.length; j++) {
      const currentTurn = currentRound[j] % N;

      let targetIndex = circle.length - currentTurn;

      circle.push(...circle.slice(targetIndex - (N - currentTurn), targetIndex));
      const currentCircle = circle.slice(-N);
      const currentNumber = currentCircle[0];

      if (currentNumber === P) {
        // 번호,라운드
        result = [j + 1, i + 1].join(' ');

        i = roundInfo.length;
        break;
      }
    }
  }

  console.log(result);

  process.exit();
});
