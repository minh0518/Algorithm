// 24.3.14
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
  const balls = data.shift().split('');

  // red,blue
  const count = [0, 0];
  for (let i of balls) {
    if (i === 'R') count[0] += 1;
    if (i === 'B') count[1] += 1;
  }

  // 빨간 공으로 시작했을 때 이동해야 하는 갯수
  const redStart = () => {
    if (balls[0] === 'R') {
      // 앞에서 연속된 R의 갯수
      let redContinuousCount = balls.indexOf('B');

      // 나머지 R의 갯수
      return count[0] - redContinuousCount;
    }
    return count[0];
  };

  // 파란 공으로 시작했을 때 이동해야 하는 갯수
  const blueStart = () => {
    if (balls[0] === 'B') {
      // 앞에서 연속된 B의 갯수
      let blueContinuousCount = balls.indexOf('R');

      // 나머지 B의 갯수
      return count[1] - blueContinuousCount;
    }
    return count[1];
  };

  // 빨간 공으로 끝났을 때 이동해야 하는 갯수
  const redEnd = () => {
    if (balls[balls.length - 1] === 'R') {
      // 끝에서 연속된 R의 갯수
      let redContinuousCount = N - (balls.lastIndexOf('B') + 1);

      // 나머지 R의 갯수
      return count[0] - redContinuousCount;
    }
    return count[0];
  };

  // 파란 공으로 끝났을 때 이동해야 하는 갯수
  const blueEnd = () => {
    if (balls[balls.length - 1] === 'B') {
      // 끝에서 연속된 B의 갯수
      let blueContinuousCount = N - (balls.lastIndexOf('R') + 1);

      // 나머지 B의 갯수
      return count[1] - blueContinuousCount;
    }
    return count[1];
  };

  console.log(Math.min(N, redStart(), blueStart(), redEnd(), blueEnd()));

  process.exit();
});
