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
  const arr = data.shift().split(' ').map(Number);

  const resultArr = new Array(N).fill(-1);

  const stack = [[arr[0], 0]];

  for (let i = 1; i < arr.length; i++) {
    // 현재 값
    const [currentValue, currentIndex] = [arr[i], i];

    // 스택의 마지막 값
    let [lastValue, lastIndex] = stack.at(-1);

    // 스택의 마지막 값 >= 현재 값 일때까지 반복
    while (lastValue < currentValue) {
      // 스택 마지막 값 제거 및 추출
      const [targetValue, targetIndex] = stack.pop();

      // 정답 인덱스에 값 추가
      resultArr[targetIndex] = currentValue;

      // 스택이 먼저 비어버리면 끝
      if (!stack.length) break;
      // 스택의 마지막 값 갱신
      lastValue = stack.at(-1)[0];
    }

    // 현재 값을 스택에 추가
    stack.push([currentValue, currentIndex]);
  }

  console.log(resultArr.join(' '));

  process.exit();
});
