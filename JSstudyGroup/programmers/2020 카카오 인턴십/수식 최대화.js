function solution(expression) {
  expression = expression.split('');

  // 연산자만 추출
  const operator = [...new Set(expression.filter((i) => isNaN(i)))];

  // '1-2+3' >> [1,'-',2,'+',3] 형태로 변환
  let wholeExpression = [];
  for (let i = 0; i < expression.length; i++) {
    let current = expression[i];

    if (operator.includes(current)) {
      wholeExpression.push(current);
      continue;
    }
    if (!operator.includes(current)) {
      let number = current;
      let index = i + 1;
      while (index < expression.length) {
        if (isNaN(expression[index])) break;
        number += expression[index];
        index += 1;
      }
      wholeExpression.push(Number(number));
      i = index - 1;
    }
  }

  // 가능한 수식의 모든 순서를 백트래킹으로 구현
  let order = [];
  const dfs = (current) => {
    if (current.length === operator.length) {
      order.push(JSON.parse(JSON.stringify(current)));
      return;
    }

    for (let i = 0; i < operator.length; i++) {
      if (current.includes(operator[i])) continue;
      current.push(operator[i]);
      dfs(current);
      current.pop();
    }
  };
  dfs([]);

  // 구해진 수식의 각 경우들을 바탕으로 계산
  let result = [];
  for (let i of order) {
    let copyExpressionWithNumber = JSON.parse(JSON.stringify(wholeExpression));
    for (let j of i) {
      let currentOperator = j;

      for (let k = 0; k < copyExpressionWithNumber.length; k++) {
        let currentValue = copyExpressionWithNumber[k];
        if (currentValue === currentOperator) {
          let calcResult;
          if (currentOperator === '-') {
            calcResult = copyExpressionWithNumber[k - 1] - copyExpressionWithNumber[k + 1];
          }
          if (currentOperator === '+') {
            calcResult = copyExpressionWithNumber[k - 1] + copyExpressionWithNumber[k + 1];
          }
          if (currentOperator === '*') {
            calcResult = copyExpressionWithNumber[k - 1] * copyExpressionWithNumber[k + 1];
          }
          copyExpressionWithNumber.splice(k - 1, 3, calcResult);
          k -= 1;
        }
      }
    }

    result.push(Math.abs(Number(copyExpressionWithNumber)));
  }
  return Math.max(...result);
}
