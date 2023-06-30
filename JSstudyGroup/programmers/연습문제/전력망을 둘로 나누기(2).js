function solution(n, wires) {
  const tree = new Array(n + 1).fill().map(() => []);
  for (let i of wires) {
    let [from, to] = i;
    tree[from].push(to);
    tree[to].push(from);
  }

  const dfs = (index, visited, target) => {
    visited[index] = true;
    let count = 1;

    const adjNodes = tree[index];
    for (let i of adjNodes) {
      if (i === target || visited[i]) continue;
      count += dfs(i, visited, target);
    }

    return count;
  };

  let result = [];
  for (let i of wires) {
    let [from, to] = i;
    let first = dfs(from, new Array(n + 1).fill(false), to);
    let second = dfs(to, new Array(n + 1).fill(false), from);
    result.push(Math.abs(first - second));
  }

  return Math.min(...result);
}

solution(9, [
  [1, 3],
  [2, 3],
  [3, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [7, 8],
  [7, 9],
]);
solution(4, [
  [1, 2],
  [2, 3],
  [3, 4],
]);
solution(7, [
  [1, 2],
  [2, 7],
  [3, 7],
  [3, 4],
  [4, 5],
  [6, 7],
]);
