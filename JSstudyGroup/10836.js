const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [M, N] = data.shift().split(' ').map(Number);
  const info = data.map((i) => i.split(' ').map(Number));
  const boardForGrow = new Array(M).fill(undefined).map(() => new Array(M).fill(0));

  const order = new Array(2 * M - 1).fill(0);
  for (let [zero, one, two] of info) {
    const first = zero; // 0~1점 경계선
    const second = zero + one; // 1~2점 경계선
    for (let i = first; i < second; i++) {
      order[i] += 1;
    }
    for (let i = second; i < order.length; i++) {
      order[i] += 2;
    }
  }

  // order배열을 기반으로 0행 0열의 값을 갱신
  const half = Math.floor(order.length / 2);
  // 0열
  for (let i = 0; i < half; i++) {
    boardForGrow[M - 1 - i][0] += order[i];
  }

  // 0행
  for (let i = half; i < order.length; i++) {
    boardForGrow[0][i - (M - 1)] += order[i];
  }

  // 나머지
  for (let row = 1; row < M; row++) {
    for (let col = 1; col < M; col++) {
      boardForGrow[row][col] = boardForGrow[row - 1][col];
    }
  }

  console.log(
    boardForGrow
      .map((i) => i.map((j) => j + 1))
      .map((i) => i.join(' '))
      .join('\n'),
  );

  process.exit();
});
