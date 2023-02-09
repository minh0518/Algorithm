const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  class Heap {
    constructor(compare = (a, b) => a < b) {
      // default : 최소 힙
      this.heap = [null];
      this.compare = compare;
    }
    insert(item) {
      this.heap.push(item);
      let i = this.heap.length - 1;
      while (i !== 1 && this.compare(item, this.heap[Math.floor(i / 2)])) {
        this.heap[i] = this.heap[Math.floor(i / 2)];
        i = Math.floor(i / 2);
      }
      this.heap[i] = item;
    }
    delete() {
      const item = this.heap[1];
      const tmp = this.heap.pop();
      const len = this.heap.length - 1;
      let parent = 1;
      let child = 2;
      while (child <= len) {
        if (child < len && this.compare(this.heap[child + 1], this.heap[child]))
          child += 1;
        if (this.compare(tmp, this.heap[child])) break;
        this.heap[parent] = this.heap[child];
        parent = child;
        child *= 2;
      }
      if (this.heap.length > 1) this.heap[parent] = tmp;
      return item;
    }
    empty() {
      return this.heap.length === 1;
    }
  }

  class PriorityQueue {
    constructor(compare) {
      this.heap = new Heap(compare);
    }
    empty() {
      return this.heap.empty();
    }
    push(item) {
      this.heap.insert(item);
    }
    pop() {
      if (!this.empty()) return this.heap.delete();
      else return null;
    }
  }

  const pq = new PriorityQueue((a, b) => a.cost < b.cost);

  const [N, E] = data.shift().split(' ').map(Number);

  const start = parseInt(data.shift());

  let info = data.map((i) => i.split(' ').map(Number));

  const graph = Array.from(Array(N + 1), () => []);

  for (let i = 0; i < E; i++) {
    const [from, to, cost] = info[i];

    graph[from].push({ to, cost });
  }

  const distance = Array(N + 1).fill(Infinity);

  const bfs = (x) => {
    pq.push({ to: x, cost: 0 });

    distance[x] = 0;

    while (!pq.empty()) {
      const { to, cost } = pq.pop();

      // (pq에서 꺼내온) 노드까지 필요한 cost가
      // (기존 거리테이블에 있는) 노드까지의 cost보다 크다면
      // 이 노드에 인접한 노드들도 최솟값으로 갱신될리가 없으므로 continue
      if (distance[to] < cost) {
        continue;
      }

      let adjNodes = graph[to];
      for (let i = 0; i < adjNodes.length; i++) {
        let { to: nextNode, cost: nextCost } = adjNodes[i];

        // 현재 노드에서 인접한 노드까지의 cost + 현재 노드까지 걸린 cost
        nextCost += cost;

        // 거리테이블과 비교 후 갱신
        if (nextCost < distance[nextNode]) {
          distance[nextNode] = nextCost;

          // 갱신한 노드를 나중에 방문할 목록에 둬야하므로 우선순위 큐에 push
          pq.push({ to: nextNode, cost: nextCost });
        }
      }
    }
  };

  bfs(start);

  console.log(
    distance
      .slice(1)
      .map((value) => (value === Infinity ? 'INF' : value))
      .join('\n'),
  );

  process.exit();
});
