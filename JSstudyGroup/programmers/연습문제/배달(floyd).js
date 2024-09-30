function solution(N, road, K) {
  const graph = new Array(N + 1).fill(undefined).map(() => new Array(N + 1).fill(Infinity));

  for (const [from, to, value] of road) {
    graph[from][to] = graph[from][to] < value ? graph[from][to] : value;
    graph[to][from] = graph[to][from] < value ? graph[to][from] : value;
  }

  const floyd = [];
  for (const row of graph) {
    floyd.push(row);
  }

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (i === j) continue;
        if (k === i || k === j) continue;
        floyd[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  return floyd[1].filter((i) => i <= K).length + 1;
}
