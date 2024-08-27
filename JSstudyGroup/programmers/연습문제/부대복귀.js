function solution(n, roads, sources, destination) {
  const graph = new Array(n + 1).fill(undefined).map(() => []);

  for (let [from, to] of roads) {
    graph[from].push(to);
    graph[to].push(from);
  }

  const visited = new Array(n + 1).fill(-1);
  visited[destination] = 0;

  const bfs = (start) => {
    const queue = [[start, 0]];

    while (queue.length) {
      const [currentNode, currentValue] = queue.shift();
      const nextNodes = graph[currentNode];

      for (let node of nextNodes) {
        if (visited[node] !== -1) continue;
        const nextValue = currentValue + 1;
        visited[node] = nextValue;
        queue.push([node, nextValue]);
      }
    }
  };

  bfs(destination);
  const result = [];
  for (let i of sources) {
    result.push(visited[i]);
  }
  return result;
}
