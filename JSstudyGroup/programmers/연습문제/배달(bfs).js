function solution(N, road, K) {
  // 각 노드의 최단 비용을 담는 배열
  let result = new Array(N + 1).fill(500000);
  // 시작 지점은 1번 노드는 비용이 0
  result[1] = 0;

  // 그래프 생성
  const graph = new Array(N + 1).fill().map(() => []);

  for (let i of road) {
    let [from, to, value] = i;
    graph[from].push({ to, value });
    graph[to].push({ to: from, value });
  }

  let queue = [{ to: 1, value: 0 }];

  while (queue.length) {
    let currentNode = queue.shift();

    // 현재 노드로부터 방문할 수 있는 노드들을 순회
    for (let i of graph[currentNode.to]) {
      let { to, value } = i;

      // 방문 가능한 노드(to)로 가는데 사용되는 비용이 정답배열에 비용보다 작다면 갱신
      // 정답배열에 존재하는 to까지 걸리는 비용 >  현재 노드까지 걸린 비용 + to로 가는데 사용되는 비용
      if (result[to] > currentNode.value + value) {
        result[to] = currentNode.value + value; //
        queue.push({ to: to, value: value + currentNode.value }); // queue에도 추가 해주는데 value값을 누적한 값으로 추가해야 한다
      }
    }
  }

  return result.filter((i) => i <= K).length;
}
