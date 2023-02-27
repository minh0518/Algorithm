const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let word = data.shift().split('');
  let str = new Array(word.length).fill();
  let result = [];

  const dfs = (word, start) => {
    // console.log(word, start);
    if (!word.length) {
      return;
    }

    let firstStr = [...word].sort()[0];
    let index = word.indexOf(firstStr);
    str[start + index] = firstStr;
    result.push(str.join(''));

    dfs(word.slice(index + 1), start + index + 1);
    dfs(word.slice(0, index), start);
  };

  dfs(word, 0);
  console.log(result.join('\n'));

  process.exit();
});
// S T A R T L I N K
