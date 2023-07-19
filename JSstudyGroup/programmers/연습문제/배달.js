function solution(N, road, K) {
  const graph = new Map();

  // 그래프 생성
  for (let i of road) {
    let [from, to, value] = i;

    // 양방향
    graph.has(from) ? graph.set(from, [...graph.get(from), [to, value]]) : graph.set(from, [[to, value]]);
    graph.has(to) ? graph.set(to, [...graph.get(to), [from, value]]) : graph.set(to, [[from, value]]);
  }

  const visited = new Array(N + 1).fill(false);
  visited[1] = true;

  let result = [];
  const dfs = (index, current, visited) => {
    let adj = graph.get(index);
    for (let i of adj) {
      if (current + i[1] <= K && !visited[i[0]]) {
        result.push(i[0]);
        visited[i[0]] = true;
        dfs(i[0], current + i[1], visited);
        visited[i[0]] = false; // 해당 노드 방문 기록 초기화
      }
    }
  };

  dfs(1, 0, visited);

  // console.log(result)
  return new Set(result).size + 1;
}
