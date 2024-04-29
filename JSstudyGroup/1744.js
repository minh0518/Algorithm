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
  const arr = data.map(Number).sort((a, b) => a - b);
  const isZero = arr.includes(0);
  let minusLength = arr.filter((i) => i < 0).length;

  const result = [];

  // 음수 처리
  if (minusLength > 1) {
    if (minusLength % 2 === 0) {
      // 음수의 갯수가 짝수라면 음수끼리 곱셈
      while (minusLength > 0) {
        const calc = arr[0] * arr[1];
        result.push(calc);
        arr.splice(0, 2);
        minusLength -= 2;
      }
    } else {
      // 음수의 갯수가 홀수라면 [가장 작은 음수를 제외하고] 음수끼리 곱셈
      while (minusLength > 1) {
        const calc = arr[0] * arr[1];
        result.push(calc);
        arr.splice(0, 2);
        minusLength -= 2;
      }
    }
  }

  // 음수의 갯수가 1개라면 (위에서 연산한 결과로 1개 or 처음부터 1개)
  if (arr.filter((i) => i < 0).length === 1) {
    // 0이 있다면 음수와 0 둘 다 포함해서 제거
    if (isZero) arr.splice(0, 1);

    // 0이 없다면 음수를 덧셈에 반영
    if (!isZero) result.push(arr.splice(0, 1)[0]);
  }

  // 양수 처리
  if (arr.length) {
    // 0 제거
    while (arr[0] === 0) arr.splice(0, 1);
    // 1은 덧셈에 반영
    while (arr[0] === 1) result.push(arr.splice(0, 1)[0]);

    // 양수의 갯수가 2개 이상일 경우
    if (arr.length >= 2) {
      if (arr.length % 2 === 0) {
        while (arr.length) {
          const calc = arr[arr.length - 1] * arr[arr.length - 2];
          result.push(calc);
          arr.splice(-2);
        }
      } else {
        while (arr.length > 1) {
          const calc = arr[arr.length - 1] * arr[arr.length - 2];
          result.push(calc);
          arr.splice(-2);
        }
      }
    }
    // 양수의 갯수가 1개일 경우 (위에서 연산한 결과로 1개 or 처음부터 1개)
    if (arr.length === 1) {
      result.push(arr.splice(0, 1)[0]); // 덧셈에 반영
    }
  }

  if (result.length) console.log(result.reduce((a, b) => a + b));
  else console.log(0);

  // 음수의 갯수가 홀수라면 0은 가장 작은 음수랑만. 그게 아니면 0은 냅둠
  // 1은 묶지 않음
  // 그 외 가장 큰 숫자끼리

  process.exit();
});
