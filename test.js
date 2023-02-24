const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3];
  let k = 4;

  for (let i = 0; i < arr.length - k; i++) {
    let getK;
    let from = i;
    let to = i + k;
    getK = arr.slice(from, to);
    console.log(getK);
  }

  process.exit();
});

// 쿠폰 번호는 제외하고 연속된 k개
// k개 중에서는 최대한 겹치는게 없도록

// k=4 , 쿠폰 30
// 7 9 7 30 2 7 9 25 (길이 8)
//          4 5 6 7
// k=4 , 쿠폰 7
// 2 7 9 25 7 9 7 30
