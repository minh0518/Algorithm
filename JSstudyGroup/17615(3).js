// 24.3.15
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

  const startBall = balls[0];
  const endBall = balls[balls.length - 1];

  let ballCountFromStart;
  let ballCountFromEnd;
  if (startBall === 'R') {
    const firstBlueIndex = balls.indexOf('B');
    let redContinuousCount = firstBlueIndex === -1 ? N : firstBlueIndex;
    ballCountFromStart = count[0] - redContinuousCount;
  }
  if (startBall === 'B') {
    const firstRedIndex = balls.indexOf('R');
    let blueContinuousCount = firstRedIndex === -1 ? N : firstRedIndex;
    ballCountFromStart = count[1] - blueContinuousCount;
  }

  if (endBall === 'R') {
    const lastBlueIndex = balls.lastIndexOf('B');
    let redContinuousCount = lastBlueIndex === -1 ? N : N - (lastBlueIndex + 1);
    ballCountFromEnd = count[0] - redContinuousCount;
  }
  if (endBall === 'B') {
    const lastRedIndex = balls.lastIndexOf('R');
    let blueContinuousCount = lastRedIndex === -1 ? N : N - (lastRedIndex + 1);
    ballCountFromEnd = count[1] - blueContinuousCount;
  }

  console.log(Math.min(count[0], count[1], ballCountFromStart, ballCountFromEnd));

  process.exit();
});
