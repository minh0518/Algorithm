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
  let cranes = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => b - a);
  const M = +data.shift();
  const boxes = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => b - a);

  // 크레인 최댓값 < 박스의 최댓값 : 절대 옮길 수 없다
  if (cranes[0] < boxes[0]) {
    console.log(-1);
  } else {
    let minute = 0;
    while (boxes.length) {
      for (let i = 0; i < cranes.length; i++) {
        const currentCrane = cranes[i];
        for (let j = 0; j < boxes.length; j++) {
          const currentBox = boxes[j];
          if (currentCrane >= currentBox) {
            boxes.splice(j, 1);
            break;
          }
        }
      }

      minute += 1;
    }
    console.log(minute);
  }

  process.exit();
});
