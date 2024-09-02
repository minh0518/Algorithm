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
  const infoArr = data.map((i) => i.split(' ').map(Number));

  const floyd = [];
  for (let i = 0; i < N; i++) {
    floyd.push(infoArr[i]);
  }

  for (let k = 0; k < N; k++) {
    for (let a = 0; a < N; a++) {
      for (let b = 0; b < N; b++) {
        floyd[a][b] = Math.min(floyd[a][b], floyd[a][k] + floyd[k][b]);
      }
    }
  }

  const dp = new Array(N).fill(Infinity);
  dp[K] = 0;

  let minValue = Infinity;
  const dfs = (depth, currentNode, currentValue) => {
    // 중복 방문을 허용하지 않기 때문에 N번 재귀를 호출하게 되면
    // 전체 노드를 방문한 것이다
    if (depth === N) {
      if (minValue > currentValue) minValue = currentValue;
      return;
    }

    for (let i = 0; i < N; i++) {
      const next = currentValue + floyd[currentNode][i];
      if (i === currentNode || dp[i] <= next) continue;
      const originValue = dp[currentNode];
      dp[currentNode] = currentValue;
      dfs(depth + 1, i, next);
      dp[currentNode] = originValue;
    }
  };
  dfs(1, K, 0);
  console.log(minValue);

  process.exit();
});
