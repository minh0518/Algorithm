const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // 접시 수 , 초밥 가지 수 , 연속 갯수 , 쿠폰 번호
  let [N, D, K, C] = data.shift().split(' ').map(Number);

  let table = data.map(Number);
  table = [...table, ...table.slice(0, K - 1)];

  let first = 0;
  let second = 0;

  let result = [];
  while (second !== table.length) {
    second += 1;
    let arr = table.slice(first, second);
    if (arr.length === K) {
      if (!arr.includes(C)) {
        result.push(new Set(arr).size + 1);
      }
      if (arr.includes(C)) {
        result.push(new Set(arr).size);
      }
      first += 1;
    }
    // if (arr.length < K && arr.includes(table[second])) {
    //   first += 1;
    // }
  }

  console.log(Math.max(...result));

  process.exit();
});
