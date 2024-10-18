const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const V = +data.shift();

  const tree = new Array(V + 1).fill(undefined).map(() => []);

  data.forEach((row) => {
    const [from, ...rest] = row.split(' ').map(Number).slice(0, -1);
    for (let i = 0; i < rest.length; i += 2) {
      const [to, value] = [rest[i], rest[i + 1]];
      tree[from].push({ to, value });
    }
  });

  const dfs = (node, visited, currentValue, candidates) => {
    const nextNodes = tree[node].filter((i) => !visited[i.to]);
    if (!nextNodes.length) {
      candidates.push([node, currentValue]);
      return;
    }

    for (const { to, value } of nextNodes) {
      visited[to] = true;
      dfs(to, visited, currentValue + value, candidates);
      visited[to] = false;
    }
  };

  // 임의의 노드에서 가장 먼 노드 판별
  const firstVisited = new Array(V + 1).fill(false);
  firstVisited[1] = true;
  const firstCandidates = [];
  dfs(1, firstVisited, 0, firstCandidates);
  firstCandidates.sort((a, b) => b[1] - a[1]);

  // 구해진 노드에서 가장 먼 노드 판별
  const secondVisited = new Array(V + 1).fill(false);
  secondVisited[firstCandidates[0][0]] = true;
  const secondCandidates = [];
  dfs(firstCandidates[0][0], secondVisited, 0, secondCandidates);
  secondCandidates.sort((a, b) => b[1] - a[1]);

  // 거리 출력
  console.log(secondCandidates.sort((a, b) => b[1] - a[1])[0][1]);

  process.exit();
});
