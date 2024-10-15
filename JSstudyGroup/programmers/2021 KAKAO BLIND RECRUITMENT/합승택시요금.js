function solution(n, s, a, b, fares) {
  const floyd = new Array(n + 1).fill(undefined).map(() => new Array(n + 1).fill(Infinity));

  for (const [from, to, value] of fares) {
    floyd[from][to] = value;
    floyd[to][from] = value;
  }

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (i === j) floyd[i][j] = 0;
        if (i !== j) floyd[i][j] = Math.min(floyd[i][j], floyd[i][k] + floyd[k][j]);
      }
    }
  }

  // 합승하지 않을 경우
  let result = floyd[s][a] + floyd[s][b];

  for (let k = 1; k <= n; k++) {
    // k까지 합승할 경우
    result = Math.min(result, floyd[s][k] + floyd[k][a] + floyd[k][b]);
  }
  return result;
}
