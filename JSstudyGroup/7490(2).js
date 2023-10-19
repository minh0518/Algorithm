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

  while (T--) {
    const index = numbers.length - 1 - T;
    const number = numbers[index];

    const permutations = [];
    const dfs = (operator, numbers, currentNumber, maxLength) => {
      numbers.push(currentNumber);

      if (operator.length + numbers.length === maxLength) {
        // 연산자의 갯수가 1개 작으므로 숫자를 먼저 1개 push
        let formula = [numbers[0]];

        // operator와 numbers를 각각 push해서 formula 완성
        for (let i = 0; i < operator.length; i++) {
          const inputOperator = operator[i];
          const inputNumber = numbers[i + 1];

          // 공백 연산자가 나오면 앞 뒤 숫자를 합침
          if (inputOperator === ' ') {
            formula[formula.length - 1] = Number(`${formula[formula.length - 1]}${inputNumber}`);
            continue;
          }
          formula.push(inputOperator);
          formula.push(inputNumber);
        }

        permutations.push(JSON.parse(JSON.stringify(formula)));
        return;
      }

      for (let i = 0; i < 3; i++) {
        operator.push(allOperators[i]);
        dfs(operator, [...numbers], currentNumber + 1, maxLength);
        operator.pop();
      }
    };
    dfs([], [], 1, number + (number - 1));

    const result = [];
    for (let singleFormula of permutations) {
      // 정답 출력을 위해 원본 복사
      let origin = [...singleFormula];

      let add = singleFormula[0];
      for (let i = 0; i < singleFormula.length - 1; i++) {
        if (isNaN(singleFormula[i])) {
          add = calc(add, singleFormula[i + 1], singleFormula[i]);
        }
      }

      if (add === 0) {
        origin = origin.map((i) => {
          // 정답 출력을 위해 공백을 다시 만들어줘야 함
          if (!isNaN(i) && String(i).length === 2) {
            const str = String(i).split('');
            return `${str[0]} ${str[1]}`;
          } else {
            return i;
          }
        });

        result.push(origin.join(''));
      }
    }

    answer.push(result.sort().join('\n'));
  }

  console.log(answer.join('\n\n'));

  process.exit();
});
