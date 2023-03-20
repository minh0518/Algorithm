const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M] = data.slice(0, 1)[0].split(' ').map(Number);

  let nodes = data.slice(1).map((i) => i.split(' ').map(Number));

  let parent = new Array(N + 1).fill().map((_, index) => index);

  const findParent = (num) => {
    if (num === parent[num]) return num;

    parent[num] = findParent(parent[num]);
    return parent[num];
  };

  const union = (x, y) => {
    x = findParent(x);
    y = findParent(y);

    if (x === y) return;

    if (x < y) parent[y] = x;
    if (x > y) parent[x] = y;
  };

  let delteCycle = 0;

  for (let i of nodes) {
    let [start, end] = i;

    // union 하기 전인데 부모가 같다면 싸이클이 존재한다는 것이다
    if (findParent(start) === findParent(end)) {
      delteCycle += 1;
    }
    // 유니온 진행
    union(start, end);
  }

  let group = 0;

  // 부모가 자기 자신인 경우엔 하나로 합쳐야 한다
  for (let i = 1; i <= N; i++) {

    
    // findParent()함수에서 부모 노드를 루트 노드로 이미 바꿔줬으므로
    // 바로 parent[i]랑 비교해도 된다
    // 만약 findParent() 함수에서 바로 return findParent(parent[num]);
    // 형태로 했다면 여기서 findParent(i)랑 비교해야 한다
    if (i === parent[i]) {
      group += 1;
    }
  }

  console.log(delteCycle + group - 1);

  process.exit();
});