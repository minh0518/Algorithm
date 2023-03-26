const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number);

  // [M, W, W, W, M] >> 0번노드 ~ 4번노드
  let nodes = data.shift().split(' ');
  let info = data.map((i) => i.split(' ').map(Number));

  // N+1로 해서 노드번호와 인덱스를 일치시키지 않음
  // 문제에서 1번노드면 여기선 [0]번노드가 되는 것
  let parent = new Array(N).fill().map((_, index) => index);

  const find = (num) => {
    if (num === parent[num]) return num;

    parent[num] = find(parent[num]);
    return parent[num];
  };

  const union = (x, y) => {
    x = find(x);
    y = find(y);

    if (x === y) return;

    if (x < y) parent[y] = x;
    if (x > y) parent[x] = y;
  };

  const isUnion = (x, y) => {
    x = find(x);
    y = find(y);

    if (x === y) return true;
    return false;
  };

  // 간선의 비용을 기준으로 오름차순
  info.sort((a, b) => a[2] - b[2]);

  let answer = 0;
  for (let i of info) {
    // 이 문제에서 주어진 1번노드가 여기서는 0번노드 이므로
    let [from, to, value] = [i[0] - 1, i[1] - 1, i[2]];

    // 2개의 노드가 싸이클이 존재하는 경우가 아니라면(=같은 루트노드를 가지고 있는 것이 아니라면)
    // , 서로 다른 성별이라면
    if (!isUnion(from, to) && nodes[from] !== nodes[to]) {
      answer += value; // 정답에 간선 비용 추가
      union(from, to); // 유니온(=2개의 노드 연결)
    }
  }

  let flag = false;
  let ancestorNode = find(0);

  // 모든 노드들의 조상노드가 같아야 전체가 연결된 형태이다
  for (let i = 0; i < nodes.length; i++) {
    if (find(i) !== ancestorNode) {
      flag = true; // 조상노드가 다르다면 전체가 연결된 것이 아니다
      break;
    }
  }

  if (flag) {
    console.log(-1);
  }
  if (!flag) {
    console.log(answer);
  }

  process.exit();
});