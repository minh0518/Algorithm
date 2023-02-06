const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();

  let info = data.map((i) => i.split(' ').map(Number));

  let graph = new Array(N + 1).fill().map(() => []);

  for (let i of info) {
    let [from, to, weight] = i;

    graph[from].push([to, weight]);
    graph[to].push([from, weight]);
  }

  //console.log(graph)

  const bfs = (start) => {
    let visited = new Array(N + 1).fill(false); //bfs를 2번 써야 하므로

    let queue = [];

    queue.push([start, 0]);
    let max = { node: 0, distance: 0 }; // 최대 거리 노드, 거리

    while (queue.length) {
      const [node, distance] = queue.shift();

      if (visited[node]) continue;
      visited[node] = true;

      if (max.distance < distance) {
        max = { node, distance }; // 갱신
      }
      for (let i of graph[node]) {
        let [nextNode, nextDistance] = i;

        queue.push([nextNode, distance + nextDistance]);
        // 양갈래로 계속 너비탐색을 해도
        // 다음 탐색할때 계속 직전에 연결된 노드에서 거리를 누적해서
        // 보내기 때문에 동시에 최대 거리 탐색이 가능한 것이다
      }
    }
    return max;
  };

  if (N === 1) {
    console.log(0);
  } else {
    let far = bfs(1).node;
    console.log(bfs(far).distance);
  }

  process.exit();
});
