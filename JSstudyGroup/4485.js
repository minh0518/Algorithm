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

  // 메인 로직
  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];
  const solution = () => {
    let N = +data.shift();
    let map = data.splice(0, N).map((i) => i.split(' ').map(Number));

    const pq = new PriorityQueue((a, b) => a.cost < b.cost);

    let distance = new Array(N).fill().map(() => new Array(N).fill(Infinity));

    const bfs = (x, y) => {
      pq.push({ to: [x, y], cost: map[x][y] });

      distance[x][y] = map[x][y];

      while (!pq.empty()) {
        const { to, cost } = pq.pop();

        // 하나의 좌료를 기점으로 상하좌우로 연결된 노드들에 대해 갱신 작업
        for (let i = 0; i < 4; i++) {
          let nx = to[0] + dx[i];
          let ny = to[1] + dy[i];

          if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
            let adj = { to: [nx, ny], cost: map[nx][ny] };

            let { to: nextNode, cost: nextCost } = adj;

            nextCost += cost;

            // 가중치가 적거나 첫 방문일때 갱신
            if (
              nextCost < distance[nextNode[0]][nextNode[1]] ||
              distance[nextNode[0]][nextNode[1]] === Infinity
            ) {
              distance[nextNode[0]][nextNode[1]] = nextCost;
              pq.push({ to: nextNode, cost: nextCost });
            }
          }
        }
      }
    };

    bfs(0, 0);

    return distance[N - 1][N - 1];
  };

  // 정답 출력
  let answer = [];
  let index = 1;
  while (1) {
    if (Number(data[0]) === 0) break;

    answer.push(`Problem ${index}: ${solution()}`);

    index += 1;
  }

  console.log(answer.join('\n'));

  process.exit();
});
