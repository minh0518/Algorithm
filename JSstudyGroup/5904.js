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

  //
  const calc = (totalLength, middlLength, N) => {
    let firstLength = (totalLength - middlLength) / 2;
    if (N <= firstLength) {
      // 앞
      return calc(firstLength, middlLength - 1, N); // 중간의 길이를 이전 단계로 줄임
    }
    if (N > firstLength + middlLength) {
      // 끝
      return calc(firstLength, middlLength - 1, N - firstLength - middlLength);
    }
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