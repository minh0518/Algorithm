const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, E] = data.shift().split(' ').map(Number);
  let start = +data.shift();
  let info = data.map((i) => i.split(' ').map(Number));

  let graph = Array.from(new Array(N + 1), () => []);

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
        if (
          child < len &&
          this.compare(this.heap[child + 1], this.heap[child])
        ) {
          child += 1;
        }
        if (this.compare(tmp, this.heap[child])) {
          break;
        }
        this.heap[parent] = this.heap[child];
        parent = child;
        child *= 2;
      }
      //end of while

      if (this.heap.length > 1) this.heap[parent] = tmp;
      return item;
    }
    empty() {
      return this.heap.length === 1;
    }
  }

  class PriorityQueue {
    // 우선순위 큐
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

  const pq = new PriorityQueue((a, b) => {
    if (a.currCnt < b.currCnt) return true;
    else return false;
  });

  for (let i = 0; i < E; i++) {
    const [from, to, cost] = info[i];
    graph[from].push({ to: to, cost: cost });
  }

  let distance = new Array(N + 1).fill(Infinity);

  let visited = new Array(N + 1).fill(false);

  function bfs(x) {
    distance[x] = 0;

    visited[x] = true;

    //queue.push({ currNode: x, currCnt: 0 });
    pq.push({ currNode: x, currCnt: 0 });

    while (!pq.empty()) {
      const { currNode, currCnt } = pq.pop();
      visited[currNode] = true;

      if (distance[currNode] < currCnt) continue;

      let linkedNode = graph[currNode];

      for (let i = 0; i < linkedNode.length; i++) {
        let nextNodeCost = currCnt + linkedNode[i]['cost'];

        let nextNodeNum = linkedNode[i]['to'];

        if (visited[nextNodeNum]) {
          continue;
        }

        if (nextNodeCost < distance[nextNodeNum]) {
          distance[nextNodeNum] = nextNodeCost;

          pq.push({
            currNode: nextNodeNum,
            currCnt: nextNodeCost,
          });
        }
      }
    }
  }

  bfs(start);

  let result = [];
  for (let i = 1; i < distance.length; i++) {
    let value = distance[i];
    if (distance[i] !== Infinity) {
      result.push(value);
      continue;
    }
    result.push('INF');
  }

  console.log(result.join('\n'));

  process.exit();
});