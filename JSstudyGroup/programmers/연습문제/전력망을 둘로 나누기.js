function solution(n, wires) {
  // 트리 구현
  let tree = new Array(n + 1).fill().map(() => []);
  for (let i = 0; i < wires.length; i++) {
    tree[wires[i][0]].push(wires[i][1]);
    tree[wires[i][1]].push(wires[i][0]);
  }

  console.log(tree);

  // 탐색
  const bfs = (start, target) => {
    let count = 1;
    const visited = new Array(n + 1).fill(false);
    let queue = [];
    queue.push(start);
    visited[start] = true;

    while (queue.length) {
      let index = queue.shift();
      for (let i = 0; i < tree[index].length; i++) {
        let linkedNodes = tree[index][i];
        if (visited[linkedNodes]) continue;

        // 잘라야 하는 부분은 queue에 push하지 않으므로써 탐색 x
        if (index === start && linkedNodes === target) continue;
        visited[linkedNodes] = true;
        queue.push(linkedNodes);
        count += 1; // 갯수 누적
      }
    }
    return count;
  };

  let result = [];
  for (let i = 0; i < n - 1; i++) {
    let [from, to] = wires[i];
    let firstPart = bfs(from, to);
    let secondPart = bfs(to, from);
    result.push(Math.abs(firstPart - secondPart));
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
