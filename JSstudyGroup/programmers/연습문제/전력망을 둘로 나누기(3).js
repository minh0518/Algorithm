function solution(n, wires) {
  const tree = new Array(n + 1).fill().map(() => []);
  for (let [from, to] of wires) {
    tree[from].push(to);
    tree[to].push(from);
  }

  const dfs = (nodeIndex, cutNode, visited) => {
    visited[nodeIndex] = true;

    let count = 1;
    const nextNodes = tree[nodeIndex];
    for (let node of nextNodes) {
      if (node === cutNode || visited[node]) continue;
      count += dfs(node, cutNode, visited);
    }

    return count;
  };

  const result = [];
  for (let [from, to] of wires) {
    const first = dfs(from, to, new Array(n + 1).fill(false));
    const second = dfs(to, from, new Array(n + 1).fill(false));
    result.push(Math.abs(first - second));
  }
  return Math.min(...result);
}
