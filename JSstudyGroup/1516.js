const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();
  const info = data.map((row) => row.split(' ').slice(0, -1).map(Number));

  // 연결 그래프
  const graph = new Array(N + 1).fill(undefined).map(() => []);

  // 각 노드의 비용
  const originValues = new Array(N + 1).fill(0);

  // 각 노드까지 도달하는데 사용된 비용(=정답 배열)
  const dp = new Array(N + 1).fill(0);

  // 현재 노드에 연결된 간선의 개수
  const linkedArr = new Array(N + 1).fill(0);

  /** 위 4개의 배열 초기화 */
  for (let i = 0; i < info.length; i++) {
    const currentNode = i + 1;
    const [value, ...rest] = info[i];

    // 해당 노드의 비용 업데이트
    originValues[currentNode] = value;

    // 간선의 개수 업데이트 (현재 노드로 연결된 개수 추가)
    linkedArr[currentNode] = rest.length;

    // 그래프 업데이트 (현재 노드로부터 연결된 노드 추가)
    for (let j = 0; j < rest.length; j++) {
      const node = rest[j];
      graph[node].push(currentNode);
    }
  }

  // 큐 초기화
  const queue = [];
  for (let i = 1; i < linkedArr.length; i++) {
    if (linkedArr[i] > 0) continue;
    queue.push(i);
    dp[i] = originValues[i];
  }

  let index = 0;
  while (index < queue.length) {
    const node = queue[index++];
    const nextNodes = graph[node];
    for (const nextNode of nextNodes) {
      linkedArr[nextNode] -= 1;
      // 연결된 간선의 개수가 없다면 해당 노드 push(=방문 가능)
      if (linkedArr[nextNode] === 0) queue.push(nextNode);

      // DP
      dp[nextNode] = Math.max(dp[nextNode], dp[node] + originValues[nextNode]);
    }
  }
  console.log(dp.slice(1).join('\n'));

  process.exit();
});
