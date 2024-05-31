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
  const str = data
    .shift()
    .split('')
    .map((i) => {
      if (isNaN(i)) return i;
      return Number(i);
    });

  // 완성된 수식을 스택을 통해 계산하는 함수
  const calc = (arr) => {
    const stack = [];
    stack.push(arr[0], arr[1]);

    for (let i = 2; i < arr.length; i += 2) {
      const a = stack[i - 2];
      const operator = arr[i - 1];
      const b = arr[i];

      if (operator === '+') {
        stack.push(a + b);
        if (i + 1 < arr.length) stack.push(arr[i + 1]);
      }
      if (operator === '-') {
        stack.push(a - b);
        if (i + 1 < arr.length) stack.push(arr[i + 1]);
      }
      if (operator === '*') {
        stack.push(a * b);
        if (i + 1 < arr.length) stack.push(arr[i + 1]);
      }
    }

    return stack.at(-1);
  };

  const result = [];

  const dfs = (current, index) => {
    // 현재 괄호 위치current를 기반으로 수식을 생성
    // (모든 경우를 파악해야 하므로 이건 매 재귀마다 진행한다)
    // (어차피 조합이므로 중복없음)
    const expression = [];
    for (let i = 0; i < current.length; i++) {
      if (current[i]) {
        const a = str[i];
        const operator = str[i + 1];
        const b = str[i + 2];
        let calcResult;
        if (operator === '-') {
          calcResult = a - b;
        }
        if (operator === '+') {
          calcResult = a + b;
        }
        if (operator === '*') {
          calcResult = a * b;
        }
        expression.push(calcResult);

        i += 2;
      }
      if (!current[i]) {
        expression.push(str[i]);
      }
    }

    if (expression.length === 1) result.push(expression[0]);
    if (expression.length > 1) result.push(calc(expression));
    if (index >= N - 2) {
      return;
    }
    for (let i = index; i < N - 2; i += 2) {
      current[i] = true;
      current[i + 1] = true;
      current[i + 2] = true;
      dfs(current, i + 4);
      current[i] = false;
      current[i + 1] = false;
      current[i + 2] = false;
    }
  };

  const current = new Array(N).fill(false);

  // 괄호 위치 완전탐색 및 결과 확인
  dfs(current, 0);

  console.log(Math.max(...result));

  process.exit();
});
