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
  const truthInfo = data.shift().split(' ').map(Number).slice(1);
  const partyInfo = data.map((i) => i.split(' ').map(Number).slice(1));

  // 모든 파티를 통틀어서 서로 만난 사람들을 연결하기 위한 백트래킹
  const graph = new Array(N + 1).fill(undefined).map(() => []);
  const dfsForGraph = (arr, current, index, lastIndex) => {
    if (current.length === 2) {
      const [from, to] = [current[0], current[1]];
      graph[from].push(to);
      graph[to].push(from);
      return;
    }

    for (let i = index; i < lastIndex; i++) {
      current.push(arr[i]);
      dfsForGraph(arr, current, i + 1, lastIndex);
      current.pop();
    }
  };

  // 각 파티에서 서로 연결된 사람들 중, 진실을 아는 사람이 있다면 true 반환
  const dfsForLinkedPeople = (index, visited) => {
    visited[index] = true;
    if (truthInfo.includes(index)) return true;

    const nextNodes = graph[index];
    for (let node of nextNodes) {
      if (visited[node]) continue;
      if (dfsForLinkedPeople(node, visited)) return true;
    }
  };

  // 메인 로직
  // 1. 파티에서 만난 사람끼리 연결
  for (let party of partyInfo) {
    dfsForGraph(party, [], 0, party.length);
  }
  // 2. 연결된 정보를 기준으로 진실을 말할 수 있는 파티를 카운팅
  let count = 0;
  for (let party of partyInfo) {
    // 현재 파티에서 연결된 사람 중 진실을 아는 사람이 있다면 패스
    if (party.some((person) => dfsForLinkedPeople(person, new Array(N + 1).fill(false)))) continue;
    count += 1;
  }
  console.log(count);

  process.exit();
});
