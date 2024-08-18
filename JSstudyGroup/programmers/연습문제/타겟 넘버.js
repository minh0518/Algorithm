function solution(numbers, target) {
  const operators = ['+', '-'];
  let count = 0;
  const dfs = (current, index) => {
    if (index === numbers.length) {
      if (current === target) count += 1;
      return;
    }
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];

      // 현재 연산자가 쌓인 개수(index) === 현재 숫자 인덱스
      let number = numbers[index];

      if (operator === '-') number *= -1;
      dfs(current + number, index + 1);
    }
  };
  dfs(0, 0);
  return count;
}
