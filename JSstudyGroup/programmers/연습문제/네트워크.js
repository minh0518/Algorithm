function solution(n, computers) {
  let graph = new Array(n + 1).fill().map(() => []);

  for (let i = 0; i < computers.length; i++) {
    for (let j = 0; j < computers[i].length; j++) {
      if (i === j || computers[i][j] === 0) continue;
      graph[i + 1].push(j + 1);
    }
  }

  const visited = new Array(n + 1).fill(false);

  const dfs = (index) => {
    visited[index] = true;

    let adjNodes = graph[index];
    if (adjNodes) {
      for (let i of adjNodes) {
        if (!visited[i]) dfs(i);
      }
    }
  };

  let count = 0;
  for (let i = 1; i < graph.length; i++) {
    let nodeNum = i;
    if (!visited[nodeNum]) {
      dfs(nodeNum);
      count += 1;
    }
  }

  console.log(count);
  return count;
}
