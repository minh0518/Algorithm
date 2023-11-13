const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const S = data.shift().split('');
  const T = data.shift().split('');

  let result = 0;
  const dfs = (current) => {
    if (current.length === S.length) {
      if (current.join('') === S.join('')) {
        result = 1;
        return true;
      }
      return false;
    }

    // 역순의 조건에 맞을때만 해당 재귀 진행 - A추가하는 과정의 역순
    if (current[current.length - 1] === 'A') {
      let lastValue = current.pop();
      if (dfs(current)) return true;
      current.push(lastValue);
    }
    // 역순의 조건에 맞을때만 해당 재귀 진행 - B추가하고 뒤집는 과정의 역순
    if (current[0] === 'B') {
      const reversed = [...current].reverse();
      reversed.pop();
      if (dfs(reversed)) return true;
      // current는 원본은 변경한 것이 없으므로 다시 복구할 필요 x
    }

    return false;
  };

  dfs(T);
  console.log(result);

  process.exit();
});
