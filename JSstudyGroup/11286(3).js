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
    constructor (compare = (a, b) => a < b) { // default : 최소 힙
      this.heap = [null]; //초기값을 null로 줘서 일부러 [1]부터 사용하려고 함
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
      const tmp = this.heap.pop(); 
      const len = this.heap.length-1;
      let parent = 1;
      let child = 2;
      while(child <= len){

        if(child < len && this.compare(this.heap[child+1], this.heap[child])){
          child += 1;
        }

        if(this.compare(tmp, this.heap[child])){
          break;
        }
        this.heap[parent] = this.heap[child];
        parent = child;
        child *= 2;

      }

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


  const pq = new PriorityQueue((a, b) => {
    if(a[0] < b[0]) return true;
    else if(a[0] > b[0]) return false;
    else { //a[0] === b[0]
      if(a[1] < b[1]) return true;
      else return false;
    }
  });


  data.shift() //N제거
  let result=''
  data.map(item=>{
    let input=Number(item)
    if(input){ //0이 아닐 경우
      pq.push([Math.abs(input),(input)])
    }
    else{
     let tmp=pq.pop()
     if(!tmp){
      result+='0\n'
     }
     else{
      result+=tmp[1]+'\n'
     }
      
    }
  })
  console.log(result)

  process.exit()
})

