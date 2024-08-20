const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let T = +data.shift();
  const operators = [' ', '+', '-'];

  const result = [];

  // 중복을 포함한 순열
  const dfs = (current, number, N) => {
    if (current.length === N - 1) {
      const expression = [...current, number].join('');
      const expressionForCalc = expression.split(' ').join('');

      let sum = 0;
      let prevOperator = '+';
      let numberStr = '';

      for (let i = 0; i < expressionForCalc.length; i++) {
        const current = expressionForCalc[i];
        if (current === '-' || current === '+') {
          if (prevOperator === '-') sum += -1 * numberStr;
          if (prevOperator === '+') sum += Number(numberStr);
          prevOperator = current;
          numberStr = '';
          continue;
        }
        numberStr += current;
      }

      // 마지막 값
      if (prevOperator === '-') sum += -1 * numberStr;
      if (prevOperator === '+') sum += Number(numberStr);

      if (sum === 0) {
        result.push(expression + '\n');
      }

      return;
    }

    // 최종 연산
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      current.push('' + number + operator);
      dfs(current, number + 1, N);
      current.pop();
    }
  };

  while (T--) {
    const N = +data.shift();
    dfs([], 1, N);
    result.push('\n');
  }
  result.pop();

  console.log(result.join(''));

  process.exit();
});
