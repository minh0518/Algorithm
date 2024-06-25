const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M] = data.shift().split(' ').map(Number);
  const truth = data.shift().split(' ').map(Number).slice(1);
  const partyInfo = data.map((i) =>
    i
      .split(' ')
      .map(Number)
      .slice(1)
      .sort((a, b) => a - b),
  );

  const arr = new Array(N + 1).fill(undefined).map((_, index) => index);

  const find = (target) => {
    if (target === arr[target]) return target;
    arr[target] = find(arr[target]);
    return arr[target];
  };

  // current를 target에 연결
  const union = (current, target) => {
    const currentRoot = find(current);
    const targetRoot = find(target);
    arr[currentRoot] = targetRoot;
  };

  // 메인 로직

  // 1. 각 파티정보를 기반으로 유니온 진행
  for (let party of partyInfo) {
    const [target, rest] = [party[0], party.slice(1)];
    for (let i of rest) {
      union(i, target);
    }
  }

  // 2. 유니온된 정보를 바탕으로 진실을 하는 사람의 루트를 파악
  const truthInfo = truth.map((i) => find(arr[i]));

  // 3. 각 파티의 사람들의 루트가 truthInfo에 속한다면 패스
  let count = 0;
  for (let party of partyInfo) {
    if (party.some((i) => truthInfo.includes(find(i)))) continue;
    count += 1;
  }

  console.log(count);

  process.exit();
});
