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
  const info = data.map(Number).sort((a, b) => a - b);

  // A + B + C = X

  const search = (target) => {
    let left = 0;
    let right = sumArr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = sumArr[mid];

      if (midValue > target) {
        right = mid - 1;
      }
      if (midValue < target) {
        left = mid + 1;
      }
      if (midValue === target) {
        return true;
      }
    }
    return false;
  };

  const result = [];
  const dfs = (current, index) => {
    if (current.length === 2) {
      // 두번째 값이 X가 되고(더 크니까)
      // 이들의 차이값(X-C)를 sumArr(A+B의 경우의 수)에서 찾음
      const C = current[0];
      const X = current[1];

      const exist = search(X - C);
      if (exist) result.push(X);

      return;
    }

    for (let i = index; i < info.length; i++) {
      current.push(info[i]);
      // X와C는 같을 필요가 없으므로 중복이 없는 조합으로 진행
      dfs(current, i + 1);
      current.pop();
    }
  };

  // A + B 의 모든 경우의 수
  const sumArr = [];
  for (let i = 0; i < N; i++) {
    // 중복이 허용되므로 j=i부터 시작
    for (let j = i; j < N; j++) {
      sumArr.push(info[i] + info[j]);
    }
  }
  sumArr.sort((a, b) => a - b);

  // C, X 의 조합을 구한 뒤 이분탐색 진행
  dfs([], 0);

  console.log(Math.max(...result));

  process.exit();
});
