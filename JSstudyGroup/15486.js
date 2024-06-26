const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();
  const info = data.map((i) => i.split(' ').map(Number));
  const dp = new Array(N + 1).fill(0);

  let maxValue = 0;
  for (let i = 0; i < N; i++) {
    // 만약 현재 일자에, 이미 이전에 마무리 됐던 과제로 비용이 추가돼있다면
    // 그 값을 앞으로 비교하는데 사용
    maxValue = Math.max(maxValue, dp[i]);

    // 오늘 수행하는 과제
    const [day, pay] = info[i];

    // 비용을 지급받는 날짜
    const payDay = i + day;

    if (payDay > N) continue; // 퇴사일까지 과제완료가 불가능한 경우
    //(= N까지 과제를 완료하면 비용은 받을 수 있지만 그것마저 불가능한 경우)

    // Math.max( 기존에 진행했었던 다른 과제의 비용 , maxValue + 오늘 수행한 과제비용 )
    dp[payDay] = Math.max(dp[payDay], maxValue + pay);
  }
  console.log(Math.max(...dp));

  process.exit();
});
