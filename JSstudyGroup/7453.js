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
  let copyN = N;
  const [A, B, C, D] = [[], [], [], []];

  while (copyN--) {
    data
      .shift()
      .split(' ')
      .map(Number)
      .forEach((value, index) => {
        if (index === 0) A.push(value);
        if (index === 1) B.push(value);
        if (index === 2) C.push(value);
        if (index === 3) D.push(value);
      });
  }

  const CXD = new Map();

  const AXB = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      AXB.push(A[i] + B[j]);
      const CDValue = C[i] + D[j];

      // CXD에 대한 배열대신, C[i] + D[j]값이 몇개 들어가있는지에 대한
      // Map 객체를 생성
      CXD.set(CDValue, CXD.has(CDValue) ? CXD.get(CDValue) + 1 : 1);
    }
  }

  let count = 0;
  for (let i = 0; i < AXB.length; i++) {
    const value = AXB[i];
    const target = -value;

    count += CXD.has(target) ? CXD.get(target) : 0;
  }
  console.log(count);
  process.exit();
});
