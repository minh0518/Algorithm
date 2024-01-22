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

  let redBalls = 0;
  let blueBalls = 0;
  balls.forEach((ball) => {
    if (ball === 'R') redBalls += 1;
    if (ball === 'B') blueBalls += 1;
  });

  let minValue = Math.min(redBalls, blueBalls);

  const startBall = balls[0];
  let countFromStart = 1;
  for (let i = 1; i < balls.length; i++) {
    if (startBall !== balls[i]) break;
    countFromStart += 1;
  }
  const moveBallCountToStart = startBall === 'R' ? redBalls - countFromStart : blueBalls - countFromStart;
  if (minValue > moveBallCountToStart) minValue = moveBallCountToStart;

  const endBall = balls[balls.length - 1];
  let countFromEnd = 1;
  for (let i = balls.length - 2; i >= 0; i--) {
    if (endBall !== balls[i]) break;
    countFromEnd += 1;
  }
  const moveBallCountToEnd = endBall === 'R' ? redBalls - countFromEnd : blueBalls - countFromEnd;
  if (minValue > moveBallCountToEnd) minValue = moveBallCountToEnd;

  console.log(minValue);

  process.exit();
});
