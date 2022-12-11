const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [width, height] = data.shift().split(' ').map(Number);
  let N = Number(data.shift());
  let target = [];
  for (let i = 0; i < N; i++) {
    target.push(data.shift().split(' ').map(Number));
  }
  let start = data.shift().split(' ').map(Number);

  let standardSide = start[0];
  let distance = [];

  for (let i = 0; i < target.length; i++) {
    //변이 같은 경우
    if (standardSide === target[i][0]) {
      distance.push(Math.abs(target[i][1] - start[1]));
      continue;
    }

    if (standardSide === 1) {
      if (target[i][0] === 2) {
        let clockwise = width - start[1] + height + (width - target[i][1]);

        let unClockwise = start[1] + height + target[i][1];

        distance.push(Math.min(clockwise, unClockwise));
      }
      if (target[i][0] === 3) {
        distance.push(start[1] + target[i][1]);
      }
      if (target[i][0] === 4) {
        distance.push(width - start[1] + start[i][1]);
      }
    }

    if (standardSide === 2) {
      if (target[i][0] === 1) {// 반대인 경우

        // 시계방향
        let clockwise = target[i][1] + height + start[1];

        // 반 시계방향
        let unClockwise = width - target[i][1] + height + (width - start[1]);

        distance.push(Math.min(clockwise, unClockwise));
      }
      if (target[i][0] === 3) {
        distance.push(height - target[i][1] + start[1]);
      }
      if (target[i][0] === 4) {
        distance.push(height - target[i][1] + (width - start[1]));
      }
    }

    if (standardSide === 3) {
      if (target[i][0] === 1) {
        distance.push(start[1] + target[i][1]);
      }
      if (target[i][0] === 2) {
        distance.push(height - start[1] + target[i][1]);
      }
      if (target[i][0] === 4) {
        let clockwise = start[1] + width + target[i][1];

        let unClockwise = height - start[1] + width + (height - target[i][1]);

        distance.push(Math.min(clockwise, unClockwise));
      }
    }

    if (standardSide === 4) {
      if (target[i][0] === 1) {
        distance.push(start[1] + (width - target[i][1]));
      }
      if (target[i][0] === 2) {
        distance.push(height - start[1] + (width - target[i][1]));
      }
      if (target[i][0] === 3) {
        let clockwise = height - start[1] + width + (height - target[i][1]);

        let unClockwise = start[1] + width + target[i][1];
        distance.push(Math.min(clockwise, unClockwise));
      }
    }
  }

  console.log(distance.reduce((a, b) => a + b, 0));

  process.exit();
});
//변이 같으면 차이만
//변이 다른 경우
//두 변이 인접한 경우면 인접한 거리를
//두 변이 서로 반대편인 경우에는 시계방향 , 반 시계방향 둘 다 구해서 최솟값을
