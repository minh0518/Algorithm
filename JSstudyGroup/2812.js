const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, K] = data.shift().split(' ').map(Number);
  const target = data.shift().split('').map(Number);

  // 최종 숫자가 담길 스택
  const stack = [];

  let count = 0;
  stack.push(target[0]);

  for (let i = 1; i < target.length; i++) {
    let stackTop = stack[stack.length - 1];
    const currentValue = target[i];

    // K만큼 다 뺐다면 더이상 제거하지 않고 추가
    // 스택의 맨 위의 값이 현재 값보다 같거나 크다면 스택에 추가
    if (count === K || stackTop >= currentValue) {
      stack.push(currentValue);
      continue;
    }

    // 스택의 맨 위의 값이 현재 값보다 작다면
    // 그렇지 않을때까지 스택에서 pop
    while (stack.length && stackTop < currentValue && count < K) {
      stackTop = stack.at(-1);
      if (stackTop < currentValue) stack.pop();
      else break;

      count += 1; // pop할때마다 카운트 증가
    }
    // pop이 끝나면 현재 값을 스택에 추가
    stack.push(currentValue);
  }

  // 아래 테스트케이스들의 경우 스택에서 pop되지 않으므로 따로 제거가 필요하다
  // 5 2
  // 55551

  // 3 1
  // 321
  while (count < K) {
    // 카운트가 남았다면 그만큼 스택에서 pop
    stack.pop();
    count += 1;
  }

  console.log(stack.join(''));

  process.exit();
});
