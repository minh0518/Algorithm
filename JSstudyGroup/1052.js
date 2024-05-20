const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, K] = data.shift().split(' ').map(Number);

  if (N <= K) {
    // K개가 아닌, K개를 "넘지 않는" 비어있지 않은 물병을 만들려고하므로
    // 물을 사지 않아도 n개(n < K)의 비어있지 않는 물병이 이미 있기 때문에 0
    console.log(0);
  } else {
    const oneValues = []; // 개수가 1개가 된 물병의 무게들
    let maxCount = N; // 가장 큰 무게를 가진 물병의 개수
    let maxValue = 1; // 물병이 합쳐지는 과정에서 중 가장 큰 무게
    while (maxCount !== 1 && maxCount + oneValues.length !== K) {
      if (maxCount % 2 === 1) {
        oneValues.push(maxValue);
      }
      maxCount = Math.floor(maxCount / 2);
      maxValue *= 2;
    }
    // 최종적으로 최댓값 추가
    oneValues.push(maxValue);

    if (maxCount + oneValues.length === K) {
      console.log(0);
    } else {
      const leftCount = K;

      // 이것들을 1개로 통합
      const target = oneValues.slice(0, oneValues.length - (leftCount - 1));

      let count = 0;
      while (target.length > 1) {
        const current = target[0];
        const next = target[1];
        count += next - current;
        target.splice(0, 2, target[1] * 2);
      }
      console.log(count);
    }
  }

  process.exit();
});
