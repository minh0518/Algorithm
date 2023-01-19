//dfs

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

  let tree = new Array(N + 1).fill().map(() => []);

  for (let i of info) {
    const [from, to] = i;
    tree[from].push(to);
    tree[to].push(from);
  }

  // ex) check[2]=5 >> 2번노드의 부모노드는 5번노드
  const check = new Array(N + 1).fill(0);

  check[1] = Infinity; //임의로 0을 피한 값을 넣어줌

  const dfs = (index) => {
    let nodes = tree[index];

    for (let i of nodes) {
      //i는 nodes 에 연결되어 있는노드들이다

      // 부모 노드가 아닌 노드를 걸러낸다
      if (check[i]) continue;
      check[i] = index; // i노드의 부모노드는 node라는 것이다
      dfs(i);
    }
  };

  dfs(1);
  console.log(check.slice(2).join('\n'));

  process.exit();
});
