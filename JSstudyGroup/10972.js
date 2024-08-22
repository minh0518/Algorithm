const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();
  const arr = data.shift().split(' ').map(Number);

  const getNextPremuattion = (arr) => {
    for (let i = arr.length - 1; i >= 1; i--) {
      const current = arr[i];
      const next = arr[i - 1];
      if (current <= next) continue;

      const pivot = next;
      const pivotIndex = i - 1;
      const exchangeTarget = arr
        .slice(i)
        .filter((value) => value > pivot)
        .sort((a, b) => a - b)[0];
      const exchangeTargetIndex = arr.lastIndexOf(exchangeTarget); // 중복된 exchangeTarget가 있더라도 어차피 정렬할거라 상관없음

      [arr[exchangeTargetIndex], arr[pivotIndex]] = [arr[pivotIndex], arr[exchangeTargetIndex]];
      arr = [...arr.slice(0, i), ...arr.slice(i).reverse()];
      break;
    }

    return arr;
  };

  const rseult = getNextPremuattion([...arr]);

  console.log(rseult.join('') === arr.join('') ? -1 : rseult.join(' '));

  process.exit();
});
