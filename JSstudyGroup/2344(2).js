const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number);

  let box = data.map((i) => i.split(' ').map(Number));

  let upAndRight = [
    [-1, 0],
    [0, 1],
  ];
  let downAndLeft = [
    [1, 0],
    [0, -1],
  ];

  // 박스 감싸기
  box.unshift(new Array(M + 2).fill(0));
  box.push(new Array(M + 2).fill(0));
  box.forEach((i, index) => {
    if (index !== 0 && index !== N + 1) {
      box[index].push(0);
      box[index].unshift(0);
    }
  });
  console.log(box);

  let number = 2 * N + 2 * M;

  // 맨 위 라인에서 발사
  for (let i = 0; i < box[0].length; i++) {
    if (i === 0 || i === box[0].length - 1) continue;

    let x = 0;
    let y = i;
    let dirIndex = 0; // 아래 방향

    while (1) {
      x += downAndLeft[dirIndex][0];
      y += downAndLeft[dirIndex][1];

      if (box[x][y]) {
        dirIndex = (dirIndex + 1) % downAndLeft.length;
      }
      if (!(x >= 1 && x <= box.length - 2 && y >= 1 && y <= box[0].length - 2)) break;
    }

    box[x][y] = number;
    number -= 1;
  }

  // 오른쪽 라인에서 발사
  for (let i = 0; i < box.length; i++) {
    if (i === 0 || i === box.length - 1) continue;

    let x = i;
    let y = box[0].length - 1;
    let dirIndex = 1; // 왼쪽 방향

    while (1) {
      x += downAndLeft[dirIndex][0];
      y += downAndLeft[dirIndex][1];

      if (box[x][y]) {
        dirIndex = (dirIndex + 1) % downAndLeft.length;
      }
      if (!(x >= 1 && x <= box.length - 2 && y >= 1 && y <= box[0].length - 2)) break;
    }

    box[x][y] = number;
    number -= 1;
  }

  // 아랫쪽 라인에서 발사
  for (let i = box[0].length - 1; i >= 0; i--) {
    if (i === 0 || i === box[0].length - 1) continue;
    let x = box.length - 1;
    let y = i;
    let dirIndex = 0; // 위쪽 방향

    while (1) {
      x += upAndRight[dirIndex][0];
      y += upAndRight[dirIndex][1];

      if (box[x][y]) {
        dirIndex = (dirIndex + 1) % downAndLeft.length;
      }
      if (!(x >= 1 && x <= box.length - 2 && y >= 1 && y <= box[0].length - 2)) break;
    }

    box[x][y] = number;
    number -= 1;
  }

  // 왼쪽 라인에서 발사
  for (let i = box.length - 1; i >= 0; i--) {
    if (i === 0 || i === box.length - 1) continue;
    let x = i;
    let y = 0;
    let dirIndex = 1; // 오른쪽 방향

    while (1) {
      x += upAndRight[dirIndex][0];
      y += upAndRight[dirIndex][1];

      if (box[x][y]) {
        dirIndex = (dirIndex + 1) % downAndLeft.length;
      }
      if (!(x >= 1 && x <= box.length - 2 && y >= 1 && y <= box[0].length - 2)) break;
    }
    box[x][y] = number;
    number -= 1;
  }

  // 결과 출력
  let result = [];
  for (let i = 0; i < box.length; i++) {
    let value = box[i][0];
    if (value) result.push(value);
  }
  for (let i = 0; i < box[0].length; i++) {
    let value = box[box.length - 1][i];
    if (value) result.push(value);
  }
  for (let i = box.length - 1; i >= 0; i--) {
    let value = box[i][box[0].length - 1];
    if (value) result.push(value);
  }
  for (let i = box[0].length - 1; i >= 0; i--) {
    let value = box[0][i];
    if (value) result.push(value);
  }

  console.log(result.join(' '));

  process.exit();
});
