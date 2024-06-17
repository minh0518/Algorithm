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
  const childrens = data.map(Number);

  // DP[아이들 번호]: 자신까지 증가하는 수열의 개수(LIS)
  // 기본값으로는 자기 자신만 포함한 1
  const DP = new Array(N + 1).fill(1);

  for (let i = 1; i < N; i++) {
    const currentChildren = childrens[i];

    // currentChildren보다 작은 아이의 수
    // (=최종적으로 i까지 오름차순으로 정렬된 개수)
    let smallCount = 0;

    // currentChildren앞에 있는 아이들에서 오름차순으로 정렬된 개수를 탐색
    for (let j = 0; j < i; j++) {
      const targetChildren = childrens[j];

      // currentChildren > targetChildren라면, 증가하는 수열의 형태가 된다
      if (currentChildren > targetChildren) {
        smallCount = Math.max(smallCount, DP[targetChildren]);
      }
    }

    DP[currentChildren] += smallCount;
  }

  console.log(N - Math.max(...DP));

  process.exit();
});
