const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  class Heap {
    constructor(compare = (a, b) => a < b) {
      // default : 최소 힙
      this.heap = [null]
      this.compare = compare
    }
    insert(item) {
      this.heap.push(item)
      let i = this.heap.length - 1
      while (i !== 1 && this.compare(item, this.heap[Math.floor(i / 2)])) {
        this.heap[i] = this.heap[Math.floor(i / 2)]
        i = Math.floor(i / 2)
      }
      this.heap[i] = item
    }
    delete() {
      const item = this.heap[1]
      const tmp = this.heap.pop()
      const len = this.heap.length - 1
      let parent = 1
      let child = 2
      while (child <= len) {
        if (
          child < len &&
          this.compare(this.heap[child + 1], this.heap[child])
        ) {
          child += 1
        }
        if (this.compare(tmp, this.heap[child])) {
          break
        }
        this.heap[parent] = this.heap[child]
        parent = child
        child *= 2
      }
      //end of while

      if (this.heap.length > 1) this.heap[parent] = tmp
      return item
    }
    empty() {
      return this.heap.length === 1
    }
  }

  class PriorityQueue {
    // 우선순위 큐
    constructor(compare) {
      this.heap = new Heap(compare)
    }
    empty() {
      return this.heap.empty()
    }
    push(item) {
      this.heap.insert(item)
    }
    pop() {
      if (!this.empty()) return this.heap.delete()
      else return null
    }
  }

  const pq = new PriorityQueue((a, b) => {
    if (a < b) return true
    else return false
  })

  let N = +data.shift()
  let classes = data
    .map((i) => i.split(' ').map(Number))
    .sort((a, b) => a[0] - b[0])

  pq.push(classes[0][1])
  for (let i = 1; i < N; i++) {
    if (pq.heap.heap[1] > classes[i][0]) {
      pq.push(classes[i][1])
    } else {
      pq.pop()
      pq.push(classes[i][1])
    }
  }

  console.log(pq.heap.heap.length - 1)

  process.exit()
})
