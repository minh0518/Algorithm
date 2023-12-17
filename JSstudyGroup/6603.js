const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let index = 0;

  const MAX_LENGTH = 6;
  const result = [];
  const dfs = (current, target, index) => {
    if (current.length === MAX_LENGTH) {
      result.push(current.join(' '));
      return;
    }

    for (let i = index; i < target.length; i++) {
      current.push(target[i]);
      dfs(current, target, i + 1);
      current.pop();
    }
  };
  while (1) {
    const lottoInfo = data[index].split(' ').map(Number);
    if (lottoInfo.length === 1 && lottoInfo[0] === 0) break;
    lottoInfo.shift();

    dfs([], lottoInfo, 0);

    result.push('');
    index += 1;
  }
  result.pop();
  console.log(result.join('\n'));

  process.exit();
});
