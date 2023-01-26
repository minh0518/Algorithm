const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();
  let A = data.shift().split(' ').map(Number);

  const cache = Array(N).fill(-1);

  const solve = (currentIndex) => {
    
    // 메모이제이션
    if (cache[currentIndex] !== -1) {
      return cache[currentIndex];
    }

    // 재귀 호출
    let ret = 1;

    for (let nextIndex = currentIndex + 1; nextIndex < N; nextIndex++) {
      if (A[currentIndex] < A[nextIndex]) {
        ret = Math.max(ret, solve(nextIndex) + 1);
      }
    }

    cache[currentIndex] = ret;
    return cache[currentIndex];
  };

  let ans = 0;

  for (let i = 0; i < N; i++) {
    ans = Math.max(ans, solve(i));
  }

  console.log(ans);

  process.exit();
});