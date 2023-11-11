// 24.1.18
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let target = +data.shift();

  let result = 0;
  // 5의 배수가 나올때까지 3을 뺌
  while (target >= 3) {
    // 5의 배수가 된다면 바로 정답 반환(=그리디이므로 최대한 5의 배수를 써야함)
    if (target % 5 === 0) {
      result += target / 5;
      break;
    }
    target -= 3;
    result += 1; // 봉지 개수 추가
  }

  // 3의 배수로 맞아 떨어질 경우를 제외하고
  // 3보다 작다면 3과5 둘 다 나누어지지 않는 값이다
  if (target !== 0 && target < 3) console.log(-1);
  else console.log(result);

  process.exit();
});
