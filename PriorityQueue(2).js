const { off } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  class Heap {
    constructor (compare = (a, b) => a < b) { // default : �ּ� ��
      this.heap = [null]; //�ʱⰪ�� null�� �༭ �Ϻη� [1]���� ����Ϸ��� ��
      this.compare = compare;
    }
    insert(item) {
      this.heap.push(item);
      let i = this.heap.length-1;
      while(i !== 1 && this.compare(item, this.heap[Math.floor(i/2)])){
        this.heap[i] = this.heap[Math.floor(i/2)];
        i = Math.floor(i/2);
      }
      this.heap[i] = item;
    }
    delete() {
      const item = this.heap[1];
      const tmp = this.heap.pop(); //�� �ڿ� �ִ� ��带 ����
      const len = this.heap.length-1;
      let parent = 1;
      let child = 2;
      while(child <= len){

        //���� �ڽ��� �� �� �ִٸ�, �ڱ� �ڽŰ� ���� �ڽ��� ��
        //�̰� ���� �ڽ� �߿���, ���� �ڽ��� �����ϴ� ���̴�
        //compare���� child�� child+1 �߿��� ������ child+��� child+=1�� �ϴ� ���̴�
        if(child < len && this.compare(this.heap[child+1], this.heap[child])){
          child += 1;
        }

        //��� �ڽĳ��� �������鼭 �� �ڿ� �ִ� ���� ���ϴµ�
        //���� �ڽĳ���� ���� �� ũ�ٸ� �ݺ��� �ߴ�
        if(this.compare(tmp, this.heap[child])){
          break;
        }

        //�ڽĳ�尡 �� �۾Ƽ� ��ü�� �ʿ��ϴٸ�
        //��ü�� ����
        //�θ����� ��ġ�� �ڽĳ���� ���� �־��ְ�
        //�ε����� ����
        this.heap[parent] = this.heap[child];
        parent = child;
        child *= 2;
        //�ڽ��� �翬�� 2ĭ�� �������� �ϹǷ� *2 ����
      }
      //end of while

      //���� ������ parent�� child�� �ε����� ����ؼ� ������ ������
      //�� �������� tmp���� �� heapify�Ǿ�� �Ѵٸ� �� Ʈ������ parent�� child�� �־��ְ�
      //child�� *2�� �ؼ� �Ʒ��� ��������

      //�ᱹ while ������ ������ parent�ڸ��� ��μ� tmp�� �� �ڸ��̴�
      //child���� �� ���� �ʱ� �����̴�


      //�������� parent�ڸ��� tmp�� �־���
      if(this.heap.length > 1) this.heap[parent] = tmp;
      return item;
    }
    empty() {
      return this.heap.length === 1;
    }
  }
  
  class PriorityQueue {
    constructor (compare) {
      this.heap = new Heap(compare);
    }
    empty() {
      return this.heap.empty();
    }
    push(item) {
      this.heap.insert(item);
    }
    pop() {
      if(!this.empty()) return this.heap.delete();
      else return null;
    }
  }


  const pq=new PriorityQueue((a,b)=>{
    if(a[0] < b[0]) return true;
    else return false;
  })


  //�������� �迭���·�
  pq.push([3])
  pq.push([4])
  pq.push([1])
  pq.push([8])
  pq.push([6])
  pq.push([9])
  console.log(pq.heap)



  process.exit()
})

