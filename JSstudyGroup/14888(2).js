const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  data.shift();
  let numbers = data.shift().split(' ').map(Number);

  // + - * /
  let operatorArr = data.shift().split(' ').map(Number);

  let operatorResults = [];
  const dfs = (operatorArr, current) => {
    if (!operatorArr.filter((i) => i).length) {
      operatorResults.push(JSON.parse(JSON.stringify(current)));
      return;
    }

    for (let i = 0; i < 4; i++) {
      if (!operatorArr[i]) continue;

      let operator;
      if (i === 0) {
        operator = '+';
      }
      if (i === 1) {
        operator = '-';
      }
      if (i === 2) {
        operator = '*';
      }
      if (i === 3) {
        operator = '/';
      }
      operatorArr[i] -= 1;
      current.push(operator);
      dfs(operatorArr, current);
      current.pop();
      operatorArr[i] += 1;
    }
  };

  dfs(operatorArr, []);

  let result = [];
  for (let i = 0; i < operatorResults.length; i++) {
    let numbersForCalc = [...numbers];
    let calcResult;
    for (let j = 0; j < operatorResults[i].length; j++) {
      if (operatorResults[i][j] === '+') {
        calcResult = numbersForCalc[0] + numbersForCalc[1];
      }
      if (operatorResults[i][j] === '-') {
        calcResult = numbersForCalc[0] - numbersForCalc[1];
      }
      if (operatorResults[i][j] === '*') {
        calcResult = numbersForCalc[0] * numbersForCalc[1];
      }
      if (operatorResults[i][j] === '/') {
        if (numbersForCalc[0] < 0) {
          calcResult = -Math.floor(-numbersForCalc[0] / numbersForCalc[1]);
        }
        if (numbersForCalc[0] >= 0) {
          calcResult = Math.floor(numbersForCalc[0] / numbersForCalc[1]);
        }
      }

      numbersForCalc.splice(0, 2, calcResult);
    }

    result.push(numbersForCalc[0]);
  }

  // 0과 -0을 구분해야 한다
  console.log(Math.max(...result) === 0 ? 0 : Math.max(...result));
  console.log(Math.min(...result) === 0 ? 0 : Math.min(...result));

  process.exit();
});
