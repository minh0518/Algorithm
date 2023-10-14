const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M] = data.shift().split(' ').map(Number);

  const info = data.map(Number);

  let left = Math.max(...info);
  let right = info.reduce((a, b) => a + b);
  let result;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // 현재 사용할 K
    let current = mid; // 수중에 들고 있는 돈
    let countM = 1; // mid값을 기반으로 출금한 횟수. 최초에 출금하고 시작

    for (let cost of info) {
      let restMoney = current - cost;

      // 그 날 사용할 돈이 부족하다면
      if (restMoney < 0) {
        countM += 1;
        current = mid - cost;
        continue;
      }
      // 그 날 돈이 충분하다면
      current = restMoney;
    }

    // 출금 횟수가 크다면
    if (countM > M) {
      // K값이 클수록 출금 횟수는 작아진다
      left = mid + 1;
    }
    // 출금 횟수가 작거나 같다면
    else {
      // K값이 작을수록 출금 횟수는 커진다
      result = mid; // K값이 같더라도 최솟값을 구해야 하기에 정답 기록을 하고 다시 탐색 진행
      right = mid - 1;
    }
  }

  console.log(result);

  process.exit();
});
