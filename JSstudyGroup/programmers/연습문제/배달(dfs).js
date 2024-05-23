function solution(N, road, K) {
  // 그래프 생성
  const board = new Array(N + 1).fill(undefined).map(() => []);

  for (let [from, to, value] of road) {
    board[from].push([to, value]); // [연결노드,비용]
    board[to].push([from, value]);
  }

  const result = new Set();

  // 현재 까지 누적 비용, 현재 노드, 방문 배열
  const dfs = (currentValue, currentNode, visited) => {
    // 정답 배열에 배달 가능 노드 기록
    if (currentValue <= K) {
      result.add(currentNode);
    }

    const nextNodes = board[currentNode];

    for (let i = 0; i < nextNodes.length; i++) {
      const [nodeNumber, value] = nextNodes[i];
      const nextValue = currentValue + value;

      // 현재 탐색 경로에서 이미 방문했거나, 비용이 K를 초과하면 패스
      if (visited[nodeNumber] || nextValue > K) continue;

      visited[nodeNumber] = true;
      dfs(nextValue, nodeNumber, visited);
      visited[nodeNumber] = false;
    }
  };

  dfs(0, 1, new Array(N + 1).fill(false));

  return result.size;
}
