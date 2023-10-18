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
  const numbers = data.map(Number);
  const allOperators = ['+', '-', ' '];

  const calc = (a, b, operator) => {
    if (operator === '+') {
      return Number(a) + Number(b);
    }
    if (operator === '-') {
      return Number(a) - Number(b);
    }
    if (operator === ' ') {
      return Number(`a` + `b`);
    }
  };

  const answer = [];

  // 3:35
  while (T--) {
    const index = numbers.length - 1 - T;
    const number = numbers[index];

    const permutations = [];
    const dfs = (formula, currentNumber, maxLength) => {
      formula.push(currentNumber);
      if (formula.length === maxLength) {
        permutations.push(JSON.parse(JSON.stringify(formula)));
        return;
      }

      for (let i = 0; i < 3; i++) {
        const operator = allOperators[i];
        formula.push(operator);
        dfs([...formula], currentNumber + 1, maxLength); // 복사 필수
        formula.pop(); // 3+2가 아닌 3+에서 +만 제거하기 위해
      }
    };
    dfs([], 1, number + (number - 1));

    const result = [];
    for (let singleFormula of permutations) {
      // 정답 출력을 위해 원본 복사
      const origin = [...singleFormula];

      // 공백 연산자가 나왔을 때 2개의 숫자를 합침
      for (let i = 0; i < singleFormula.length - 1; i++) {
        if (singleFormula[i] !== ' ') continue;
        singleFormula.splice(i - 1, 3, Number(`${singleFormula[i - 1]}${singleFormula[i + 1]}`));
        i -= 1; // 필수
      }

      // 마지막으로 계산
      let add = singleFormula[0];
      for (let i = 0; i < singleFormula.length - 1; i++) {
        if (isNaN(singleFormula[i])) {
          add = calc(add, singleFormula[i + 1], singleFormula[i]);
        }
      }

      if (add === 0) result.push(origin.join(''));
    }

    answer.push(result.sort().join('\n'));
  }

  console.log(answer.join('\n\n'));

  process.exit();
});
