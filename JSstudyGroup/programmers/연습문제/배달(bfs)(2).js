function solution(N, road, K) {
  const board = new Array(N + 1).fill().map(() => []);

  for (let [from, to, value] of road) {
    board[from].push({ to, value });
    board[to].push({ to: from, value });
  }

  const bfs = (startNode, startValue) => {
    const queue = [];
    const visited = new Array(N + 1).fill(Infinity);

    // 시작지점은 이동 비용이 0
    visited[1] = 0;
    queue.push({ node: startNode, currentValue: startValue });

    while (queue.length) {
      // 현재 방문한 노드, 현재 노드까지 오는데 걸린 비용
      const { node, currentValue } = queue.shift();

      const nextNodes = board[node];

      for (let { to, value } of nextNodes) {
        // 현재 노드까지 이동한 비용+다음 노드로의 이동 비용
        const nextValue = currentValue + value;
        if (nextValue > K) continue;

        if (visited[to] > nextValue) {
          visited[to] = nextValue;
          queue.push({ node: to, currentValue: nextValue });
        }
      }
    }

    return visited.filter((i) => i !== Infinity).length;
  };

  return bfs(1, 0);
}
