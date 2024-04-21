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
  const arr = data.map((i) => i.split(''));

  const draftInfo = new Map();

  // 각 알파벳의 자릿수에 따른 점수 계산
  for (let row of arr) {
    for (let i = 0; i < row.length; i++) {
      const digit = Math.pow(10, row.length - 1 - i);
      const value = row[i];
      draftInfo.set(value, draftInfo.has(value) ? draftInfo.get(value) + digit : digit);
    }
  }

  // 점수에 따라 내림차순 정렬 후, 이에 따른 우선순위 부여
  const resultArr = [...draftInfo].sort((a, b) => b[1] - a[1]);
  const resultInfo = new Map();
  let number = 9;
  for (let i of resultArr) {
    resultInfo.set(i[0], number);
    number -= 1;
  }

  // 정답 도출
  const converted = [];
  for (let row of arr) {
    const numbers = [];
    for (let col of row) {
      numbers.push(resultInfo.get(col));
    }
    converted.push(Number(numbers.join('')));
  }

  console.log(converted.reduce((a, b) => a + b));

  process.exit();
});
