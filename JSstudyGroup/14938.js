const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [n, m, r] = data.shift().split(' ').map(Number);

  // 인덱스로 참조하기 위해 [1]인덱스부터 받음
  const valuesInfo = [0, ...data.shift().split(' ').map(Number)];

  const linked = data.map((i) => i.split(' ').map(Number));

  const graph = new Array(n + 1).fill(undefined).map(() => []);
  for (let [from, to, linkedValue] of linked) {
    graph[from].push([to, linkedValue]); // [인접 노드,간선 비용]
    graph[to].push([from, linkedValue]);
  }

  const bfs = (start) => {
    // 각 노드까지의 누적된 간선 비용을 담는 배열
    const info = new Array(n + 1).fill(Infinity);
    const queue = [];

    // [시작 노드, 간선 비용]
    queue.push([start, 0]);
    info[start] = 0;

    while (queue.length) {
      const [node, linkedValue] = queue.shift();

      const nextNodes = graph[node];

      for (let i = 0; i < nextNodes.length; i++) {
        const [nextNode, nextLinkedValue] = nextNodes[i];
        const totalLinkedValue = linkedValue + nextLinkedValue;
        // 이미 기존에 방문했었던 비용이 더 작거나, m을 초과한 경우 패스
        if (info[nextNode] < totalLinkedValue || totalLinkedValue > m) continue;

        queue.push([nextNode, totalLinkedValue]);
        info[nextNode] = totalLinkedValue; // 해당 노드까지의 누적 간선 비용 업데이트
      }
    }

    // info에 Infinity가 아닌곳들은 방문한 곳들
    // 다만 info값들은 지역번호이므로, 이걸 아이템 수로 변환한 다음 최종 덧셈
    return info
      .map((item, index) => {
        if (item === Infinity) return 0;
        return valuesInfo[index];
      })
      .reduce((a, b) => a + b);
  };

  const results = [];
  for (let i = 1; i <= n; i++) {
    results.push(bfs(i));
  }
  console.log(Math.max(...results));
  process.exit();
});
