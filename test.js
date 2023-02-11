const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();

  let totalLength = 3;
  let index = 0;

  while (!(N <= totalLength)) {
    //같아도 끝
    index += 1;
    totalLength = totalLength + (index + 2) + 1 + totalLength;
  }

  const calc = (totalLength, middlLength, N) => {
    let firstLength = (totalLength - middlLength) / 2;
    if (N <= firstLength) { // 왼쪽 문자열에 있을 경우
      return calc(firstLength, middlLength - 1, N); 
    }
    if (N > firstLength + middlLength) { // 오른쪽 문자열에 있을 경우
      return calc(firstLength, middlLength - 1, N - firstLength - middlLength);
    }

    // 중간 문자열에 있을 경우 정답 도출
    if (N > firstLength && N <= firstLength + middlLength) {
      if (N - firstLength === 1) {
        return 'm';
      } else {
        return 'o';
      }
    }
  };

  let middlLength = index + 2 + 1;
  console.log(calc(totalLength, middlLength, N));

  process.exit();
});
// m o o
// m o o m o o o m o o
// m o o m o o o m o o m o o o o m o o m o o o m o o
// m o o m o o o m o o m o o o o m o o m o o o m o o m o o o o o o m o o m o o o m o o m o o o o m o o m o o o m o o