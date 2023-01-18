const { off, mainModule } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

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

  //console.log(tree)

  let check = new Array(N + 1).fill(0);

  const bfs = () => {

    // queue에 push되는 노드들은 곧 현재 노드의 자식 노드들이다
    const queue = [];

    check[1] = 1;

    for (let i of tree[1]) {
      // i는 1번노드의 자식을 의미하며
      // 각 자식 노드 값의 인덱스에 1(부모 노드)값을 넣어주고, 큐에도 넣어준다.
      check[i] = 1;
      queue.push(i);
    }

    while (queue.length) {
      const node = queue.shift();
      for (let i of tree[node]) {
        // 노드를 순회하면서, 방문한 노드라면 건너뛴다.
        if (check[i]) continue;
        check[i] = node; //i번노드의 부모인 node를 넣어주고
        queue.push(i); //다음에 i번을 타고 또 가야 하므로 i를 넣어준다
      }
    }
  };
  bfs();

  console.log(check.slice(2).join('\n'));

  process.exit();
});
