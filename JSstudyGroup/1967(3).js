const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const n = +data.shift();
  const tree = new Array(n + 1).fill().map(() => []);
  for (let i of data) {
    const [from, to, value] = i.split(' ').map(Number);
    tree[from].push({ to, value });
    tree[to].push({ to: from, value });
  }

  let terminalNodes = [];

  const dfs = (node, current, visited) => {
    visited[node] = true;
    const adjNodes = tree[node];

    // 단말노드 판별
    if (adjNodes.length === 1 && visited[adjNodes[0].to]) {
      terminalNodes.push({ node, value: current });
      // 굳이 return 안해줘도 됨.
      // 어차피 아래에서 for돌아도  if (visited[next]) 로 걸러지고 끝남
    }

    for (let nodeInfo of adjNodes) {
      const { to: next, value } = nodeInfo;
      if (visited[next]) continue;
      current += value;
      dfs(next, current, visited);
      current -= value;
      // 이건 백트래킹이 아니므로 visited는 유지해야 함
    }
  };

  if (n === 1) {
    console.log(0);
  }
  if (n !== 1) {
    // visited배열 인자에서 새로 선언하면 2번째 dfs에서 굳이
    // 초기화 할 필요 없음
    dfs(1, 0, new Array(n + 1).fill(false));

    // 루트부터 가장 비용이 큰 단말노드 판별
    const startNode = terminalNodes.sort((a, b) => b.value - a.value)[0].node;
    terminalNodes = [];

    // startNode부터 가장 비용이 큰 단말노드 판별
    dfs(startNode, 0, new Array(n + 1).fill(false));
    console.log(terminalNodes.sort((a, b) => b.value - a.value)[0].value);
  }

  process.exit();
});
