function solution(N, road, K) {
  const board = new Array(N + 1).fill(undefined).map(() => []);

  for (let [from, to, value] of road) {
    board[from].push([to, value]);
    board[to].push([from, value]);
  }

  const bfs = () => {
    // 방문노드를 담는 정답 배열
    const result = new Set();
    result.add(1);

    const queue = [];
    queue.push([1, 0]); // [노드,현재 노드까지의 비용]

    // 노드별 비용 기록 배열
    const dp = new Array(N + 1).fill(Infinity);
    dp[1] = 0; // 시작지점은 비용이 0

    while (queue.length) {
      const [currentNode, currentValue] = queue.shift();
      const nextNodes = board[currentNode];

      for (let i = 0; i < nextNodes.length; i++) {
        const [nodeNumber, value] = nextNodes[i];
        const nextValue = currentValue + value;

        // 다음 노드방문시 K를 초과하거나,
        // 기존에 다른 경로로 방문했던 비용 이상이라면 패스
        if (nextValue > K || dp[nodeNumber] <= nextValue) continue;

        queue.push([nodeNumber, nextValue]);
        result.add(nodeNumber); // 정답 기록
        dp[nodeNumber] = nextValue; // dp배열 갱신
      }
    }
    return result;
  };

  return bfs().size;
}
