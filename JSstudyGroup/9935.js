const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const str = data.shift().split('');
  const bomb = data.shift().split('');

  // 폭탄의 맨 뒤 문자
  const target = bomb.at(-1);

  // 폭탄의 맨 뒤 글자를 제외한 나머지 문자열
  const bombSlicedStr = bomb.slice(0, bomb.length - 1).join('');

  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const current = str[i];

    // 현재 문자열이 폭탄의 맨뒤 문자이며, 동시에 스택의 길이가 bombSlicedStr이상일 때
    if (current === target && stack.length >= bombSlicedStr.length) {
      // 현재스택의 맨 뒤부터 bombSlicedStr의 길이까지의 문자
      const stackSlicedStr = stack.slice(stack.length - bombSlicedStr.length).join('');

      if (stackSlicedStr === bombSlicedStr) {
        // 해당 부분을 스택에서 제거
        let popCount = bombSlicedStr.length;
        while (popCount--) stack.pop();
        continue;
      }
    }
    stack.push(current);
  }
  console.log(stack.length ? stack.join('') : 'FRULA');

  process.exit();
});
