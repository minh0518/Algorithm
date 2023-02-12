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

    // 양방향
    graph[from].push({ to, weight });
    graph[to].push({ to: from, weight });
  }

  // console.log(graph)

  let visited = new Array(N + 1).fill(false);

  let arrForFarNode = [];
  const dfs = (index, weight) => {
    visited[index] = true;

    // 인접한 노드 중에서 방문하지 않은 노드를 리턴
    let adjNode = graph[index].filter((i) => !visited[i.to]);

    // 현재 index가 단말 노드라면
    if (!adjNode.length) {
      arrForFarNode.push({ node: index, weight });
      return;
    }
    for (let i = 0; i < adjNode.length; i++) {
      let nextNode = adjNode[i].to; // 다음 노드번호
      let nextWeight = weight + adjNode[i].weight; // 다음 노드번호까지의 가중치 누적
      if (!visited[nextNode]) {
        dfs(nextNode, nextWeight);
      }
    }
  };
  dfs(1, 0);

  // 가장 가중치가 큰 노드를 찾기 위해 내림차순 sort
  arrForFarNode.sort((a, b) => {
    return b.weight - a.weight;
  });

  let farNode = arrForFarNode[0].node;

  arrForFarNode = [];
  visited = new Array(N + 1).fill(false);

  dfs(farNode, 0);
  console.log(
    arrForFarNode.sort((a, b) => {
      return b.weight - a.weight;
    })[0].weight,
  );

  process.exit();
});