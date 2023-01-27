const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [str1, str2] = data.map((i) => i.split(''));

  let LCS = new Array(str1.length + 1)
    .fill()
    .map(() => new Array(str2.length + 1).fill(0));

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        LCS[i][j] = LCS[i - 1][j - 1] + 1;
        continue;
      }
      if (str1[i - 1] !== str2[j - 1]) {
        LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
        continue;
      }
    }
  }

  const findMaxValue = (arr) => {
    let result = [];

    for (let i of arr) {
      result.push(Math.max(...i));
    }

    return Math.max(...result);
  };

  console.log(findMaxValue(LCS));

  process.exit();
});