function solution(info, edges) {
  const N = info.length;
  const tree = new Array(N).fill(undefined).map(() => []);

  for (let i = 0; i < N - 1; i++) {
    const [from, to] = edges[i];
    tree[from].push(to);
  }

  const checkCount = (current) => {
    return current.filter((i) => i === 0).length > current.filter((i) => i === 1).length;
  };

  // 최대 양의 수
  let maxValue = 0;

  const dfs = (nextNodes, current) => {
    if (!checkCount(current)) return;

    // 정답 갱신
    const sheepCount = current.filter((i) => i === 0).length;
    if (maxValue < sheepCount) maxValue = sheepCount;

    for (let i = 0; i < nextNodes.length; i++) {
      // 다음 노드에 대한 nextNodes 생성
      const copy = [...nextNodes];
      copy.splice(i, 1); // nextNodes에서 현재 방문할 노드는 제거

      current.push(info[nextNodes[i]]); //백트래킹
      dfs([...copy, ...tree[nextNodes[i]]], current);
      current.pop();
    }
  };

  dfs(tree[0], [0]);

  return maxValue;
}
