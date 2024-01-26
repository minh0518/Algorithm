const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const info = data.shift().split('');

  const result = [];
  const stack = [];
  const OPERATOR_LOW = ['+', '-'];
  const OPERATOR_HIGH = ['*', '/'];
  const OPEN = '(';
  const CLOSE = ')';

  for (let str of info) {
    if (str === OPEN) {
      stack.push(OPEN);
      continue;
    }
    if (str === CLOSE) {
      while (stack.length) {
        const topValue = stack.pop();
        result.push(topValue);
        if (topValue === OPEN) {
          result.pop();
          break;
        }
      }
      continue;
    }
    if (OPERATOR_HIGH.includes(str)) {
      if (stack.length) {
        const topValue = stack.at(-1);

        // stack의 top < 현재 연산자
        if (OPERATOR_LOW.includes(topValue)) {
          stack.push(str);
          continue;
        }

        // stack의 top >= 현재 연산자
        if (OPERATOR_HIGH.includes(topValue)) {
          while (stack.length) {
            const topValue = stack.at(-1);
            if (OPERATOR_HIGH.includes(topValue)) result.push(stack.pop());
            // 'stack의 top >= 현재 연산자' 가 아니라면 break
            // (= stack의 top < 현재 연산자  ||  stack의 top이 (  ||  stack이 비어서 더이상 pop할게 없을 때 )
            else break;
          }
        }

        // stack의 top < 현재 연산자  ||  stack의 top이 (  ||  stack이 비어서 더이상 pop할게 없을 때
        stack.push(str);
      } else {
        stack.push(str);
      }

      continue;
    }
    if (OPERATOR_LOW.includes(str)) {
      if (stack.length) {
        // stack의 top < 현재 연산자 >> 경우의 수 x

        // stack의 top >= 현재 연산자
        while (stack.length) {
          const topValue = stack.at(-1);

          if (OPERATOR_HIGH.includes(topValue) || OPERATOR_LOW.includes(topValue)) result.push(stack.pop());
          // 'stack의 top >= 현재 연산자' 가 아니라면 break
          // (= stack의 top이 (  ||  stack이 비어서 더이상 pop할게 없을 때)
          else break;
        }

        // stack의 top이 ( || stack이 비어서 더이상 pop할게 없을 때
        stack.push(str);
      } else {
        stack.push(str);
      }
      continue;
    }

    result.push(str);
  }

  while (stack.length) {
    const topValue = stack.pop();
    if (topValue !== OPEN) result.push(topValue);
  }
  console.log(result.join(''));

  process.exit();
});
