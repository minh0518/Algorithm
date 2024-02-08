// 24.2.8
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, K] = data.shift().split(' ').map(Number);
  const arr = [...data];

  if (K < 5) {
    console.log(0);
  } else {
    const basic = [...new Set('antatica'.split(''))].sort();

    // 전체 알파벳 중 a n t a t i c a 를 제외한 표본
    const targetAlphabet = new Array(26)
      .fill()
      .map((_, index) => String.fromCharCode(index + 97))
      .filter((i) => !basic.includes(i));

    const targetLength = K - basic.length;

    // 각 테스트케이스에서 a n t a t i c a 를 제외한 표본
    const rest = [];
    for (let i of arr) {
      const strArr = [...new Set(i.split('').sort())];
      rest.push(strArr.filter((i) => !basic.includes(i)));
    }

    let maxValue = 0;
    const dfs = (current, index) => {
      if (current.length === targetLength) {
        let count = 0;
        for (let i of rest) {
          // 실제 단어가 가르칠 수 있는 단어보다 길이가 길다면 패스
          if (i.length > targetLength) continue;

          const isExist = i.every((str) => {
            return current.includes(str);
          });
          if (isExist) count += 1;
        }
        if (count > maxValue) maxValue = count;
        return;
      }
      for (let i = index; i < targetAlphabet.length; i++) {
        current.push(targetAlphabet[i]);
        dfs(current, i + 1);
        current.pop();
      }
    };

    dfs([], 0);
    console.log(maxValue);
  }

  process.exit();
});
