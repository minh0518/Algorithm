const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [n, m] = data.shift().split(' ').map(Number);

  // 조합 자체가 0행은 안 쓰고 1C0 1C1로 시작 되므로
  // 1행부터 시작이 되는 것이다. 그래서 인덱스와 동일하게 만들어야 한다
  let pascal = new Array(n + 1).fill().map(() => [BigInt(1)]);
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (j === i) {
        pascal[i].push(BigInt(1));
        break;
      }
      pascal[i].push(pascal[i - 1][j - 1] + pascal[i - 1][j]);
    }
  }

  //행은 위에서 언급한대로 인덱스와 동일시 하고
  //열 역시 조합이 NC0 즉, 0부터 시작되므로 열 역시 인덱스와 동일하게 사용
  console.log(String(pascal[n][m]));

  process.exit();
});
