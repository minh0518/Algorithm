const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M, B] = data.shift().split(' ').map(Number);
  const board = data.map((i) => i.split(' ').map(Number));

  const heightArr = [];

  for (let i of board) {
    for (let j of i) {
      heightArr.push(j);
    }
  }

  heightArr.sort((a, b) => b - a);

  let result = [];
  for (let i = 0; i <= heightArr[0]; i++) {
    const standardHeight = i;
    let total = 0;
    let copyB = B;
    let flag = false;

    for (let i = 0; i < heightArr.length; i++) {
      const currentLand = heightArr[i];

      if (currentLand === standardHeight) continue;

      if (currentLand > standardHeight) {
        total += (currentLand - standardHeight) * 2;
        copyB += currentLand - standardHeight;
      }
      if (currentLand < standardHeight) {
        const gap = standardHeight - currentLand;

        if (copyB - gap < 0) {
          flag = true;
          break;
        }
        if (copyB - gap >= 0) {
          total += gap;
          copyB -= gap;
        }
      }
    }

    if (!flag) {
      result.push([total, standardHeight]);
    }
  }

  result.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });

  console.log(result[0].join(' '));

  process.exit();
});
