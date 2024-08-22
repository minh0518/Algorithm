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

  const getNextPremuattion = (arr) => {
    for (let i = arr.length - 1; i >= 1; i--) {
      const current = arr[i];
      const next = arr[i - 1];
      if (current <= next) continue;

      const pivot = next;
      const pivotIndex = i - 1;

      const exchangeTarget = arr
        .slice(i)
        .filter((i) => i > pivot)
        .sort()[0];
      const exchangeTargetIndex = arr.lastIndexOf(exchangeTarget); // 중복된 exchangeTarget가 있더라도 어차피 정렬할거라 상관없음

      [arr[exchangeTargetIndex], arr[pivotIndex]] = [arr[pivotIndex], arr[exchangeTargetIndex]];
      arr = [...arr.slice(0, i), ...arr.slice(i).reverse()];
      break;
    }

    return arr;
  };

  const result = [];
  while (T--) {
    const originStr = data.shift();

    const nextPremutation = getNextPremuattion(originStr.split(''));

    result.push(nextPremutation.join(''));
  }

  console.log(result.join('\n'));

  process.exit();
});
