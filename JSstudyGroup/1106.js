const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [C, N] = data.shift().split(' ').map(Number);
  const info = data.map((i) => i.split(' ').map(Number));

  // dp[i] : i명의 고객을 늘이기 위한 최소비용
  // i명의 고객을 인덱스로 사용하기 위해 크기는 C+1
  const dp = new Array(C + 1).fill(Infinity);
  dp[0] = 0;

  for (let [price, people] of info) {
    if (dp[people] > price) dp[people] = price;

    // i: 고객 수
    for (let i = 1; i <= C; i++) {
      if (i < people) {
        // 현재 도시에서의 비용(price)으로 얻을 수 있는 고객 수(people) > dp의 고객 수 i

        // price로 i의 고객들을 전부 획득할 수 있다는 의미이다
        // 그러므로 dp[i]와 price를 비교한다
        dp[i] = Math.min(dp[i], price);
      }
      if (i >= people) {
        // 현재 도시에서의 비용(price)으로 얻을 수 있는 고객 수(people) ≤ dp의 고객 수 i

        // 이땐 단순히 price로만 값을 구할 수 있는게 아니라,
        // dp에서 people에 해당하는 배수 값으로 dp[i]를 계산한다.
        dp[i] = Math.min(dp[i], dp[people] + dp[i - people]);
      }
    }
  }
  console.log(dp[C]);

  process.exit();
});
