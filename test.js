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

    graph[from].push({ to, weight });
    graph[to].push({ to: from, weight });
  }

  let visited = new Array(N + 1).fill(false);

  let arrForFarNode = [];
  const dfs = (index, weight) => {
    visited[index] = true;

    let adjNode = graph[index].filter((i) => !visited[i.to]);

    if (!adjNode.length) {
      arrForFarNode.push({ node: index, weight });
      return;
    }
    for (let i = 0; i < adjNode.length; i++) {
      let nextNode = adjNode[i].to;
      let nextWeight = weight + adjNode[i].weight;
      if (!visited[nextNode]) {
        dfs(nextNode, nextWeight);
      }
    }
  };
  dfs(1, 0);

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

// 모든 단말노드까지 탐색을 하고 각 단말노드까지의 누적 가중치를 배열에 둠
// sort해서 가장 먼 곳 발견

// 여기서 부터 다시 한번 더
// 그리고 또 최종적으로 sort
