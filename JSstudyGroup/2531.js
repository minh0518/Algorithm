const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // N이 최대 3만
  let [N, d, k, c] = data.shift().split(' ').map(Number);
  let table = data.map(Number);

  // k만큼 뒤에 이어줌 >> 연결되어 있는 것을 구현
  table = table.concat(table.slice(0, k));

  const check = (arr) => {
    let count = 0;

    let set = new Set();
    arr.forEach((i) => {
      set.add(i);
    });

    count = set.size;
    if (!set.has(c)) count += 1;

    return count;
  };

  let result = [];
  for (let i = 0; i < table.length - k; i++) {
    let getK;
    let from = i;
    let to = i + k;
    getK = table.slice(from, to);
    console.log(getK);

    let getCount = check(getK);
    result.push(getCount);
  }

  console.log(Math.max(...result));

  process.exit();
});


// 쿠폰 번호는 제외하고 연속된 k개
// k개 중에서는 최대한 겹치는게 없도록

// k=4 , 쿠폰 30
// 7 9 7 30 2 7 9 25 (길이 8)
//          4 5 6 7
// k=4 , 쿠폰 7
// 2 7 9 25 7 9 7 30