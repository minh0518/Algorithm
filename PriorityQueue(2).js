const { off } = require('process');
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
  class Heap {
    constructor(compare = (a, b) => a < b) {
      // default : 최소 힙
      this.heap = [null]; //초기값을 null로 줘서 일부러 [1]부터 사용하려고 함
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
      const tmp = this.heap.pop(); //맨 뒤에 있는 노드를 제거
      const len = this.heap.length - 1;
      let parent = 1;
      let child = 2;
      while (child <= len) {
        //양쪽 자식이 둘 다 있다면, 자기 자신과 다음 자식을 비교
        //이게 양쪽 자식 중에서, 작은 자식을 선택하는 것이다
        //compare에서 child와 child+1 중에서 작은게 child+라면 child+=1를 하는 것이다
        if (
          child < len &&
          this.compare(this.heap[child + 1], this.heap[child])
        ) {
          child += 1;
        }

        //계속 자식노드로 내려가면서 맨 뒤에 있는 노드와 비교하는데
        //만약 자식노드의 값이 더 크다면 반복문 중단
        if (this.compare(tmp, this.heap[child])) {
          break;
        }

        //자식노드가 더 작아서 교체가 필요하다면
        //교체를 진행
        //부모노드의 위치에 자식노드의 값을 넣어주고
        //인덱스만 변경
        this.heap[parent] = this.heap[child];
        parent = child;
        child *= 2;
        //자식은 당연히 2칸씩 내려가야 하므로 *2 진행
      }
      //end of while

      //위의 과정은 parent와 child의 인덱스를 계속해서 수정해 나가며
      //매 루프마다 tmp값이 더 heapify되어야 한다면 매 트리마다 parent를 child로 넣어주고
      //child는 *2를 해서 아래로 내려간다

      //결국 while 루프가 끝나면 parent자리에 비로소 tmp가 들어갈 자리이다
      //child보다 더 작지 않기 때문이다

      //마지막에 parent자리에 tmp를 넣어줌
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

  const pq = new PriorityQueue((a, b) => {
    if (a < b) return true;
    else return false;
  });

  pq.push(3);
  pq.push(4);
  pq.push(1);
  pq.push(8);
  pq.push(6);
  pq.push(9);
  console.log(pq.heap);

  process.exit();
});
