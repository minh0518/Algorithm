function solution(n, wires) {
  if (n === 2) return 0;

  const check = (cutIndex) => {
    const tree = new Array(n + 1).fill().map(() => []);

    for (let i = 0; i < wires.length; i++) {
      if (i === cutIndex) continue;
      const [from, to] = wires[i];
      tree[from].push(to);
      tree[to].push(from);
    }

    const visited = new Array(n + 1).fill(false);

    const dfs = (nodeIndex) => {
      visited[nodeIndex] = true;

      let count = 1;
      const nextNode = tree[nodeIndex];
      for (let i of nextNode) {
        if (visited[i]) continue;
        count += dfs(i);
      }
      return count;
    };

    const result = [];
    for (let i = 1; i < n; i++) {
      if (visited[i]) continue;
      result.push(dfs(i));
    }

    if (result.length === 1) return result[0];
    return Math.abs(result[1] - result[0]);
  };

  const result = [];
  for (let cutIndex = 0; cutIndex < wires.length; cutIndex++) {
    result.push(check(cutIndex));
  }
  return Math.min(...result);
}
