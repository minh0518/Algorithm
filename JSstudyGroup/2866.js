const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [R, C] = data.shift().split(' ').map(Number);
  const str = data.map((i) => i.split(''));

  const calc = (rowIndex) => {
    const rest = str.slice(rowIndex);
    const visited = [];
    for (let i = 0; i < rest[0].length; i++) {
      let word = '';
      for (let j = 0; j < rest.length; j++) {
        word += rest[j][i];
      }
      if (visited.includes(word)) return false;
      visited.push(word);
    }
    return true;
  };

  let left = 0;
  let right = R - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const isPossible = calc(mid);
    if (isPossible) {
      left = mid + 1;
    }
    if (!isPossible) {
      right = mid - 1;
    }
  }
  // 이분탐색이 종료됐을 땐, left가 right를 넘어간 경우인데
  // 이 때 최종적으로 right값이 가능한 범위에서 마지막 값을 가지고 있음
  console.log(right);

  process.exit();
});
