class Heap {
    constructor() {
      this.heap = []
    }

    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2)

    peek = () => this.heap[0]

    insert = (key, value) => {
      const node = { key, value }
      this.heap.push(node)
      this.heapifyUp()
    }

    heapifyUp = () => {
      let index = this.heap.length - 1

      const lastInsertedNode = this.heap[index]

      while (index > 0) {
        const parentIndex = this.getParentIndex(index)

        if (this.heap[parentIndex].key > lastInsertedNode.key) {
          this.heap[index] = this.heap[parentIndex]
          index = parentIndex
        } else break
      }

      this.heap[index] = lastInsertedNode
    }

    remove = () => {
      const count = this.heap.length

      const rootNode = this.heap[0]

      if (count <= 0) return undefined
      if (count === 1) this.heap = []
      else {
        this.heap[0] = this.heap.pop()
        this.heapifyDown()
      }

      return rootNode
    }

    heapifyDown = () => {
      let index = 0
      const count = this.heap.length
      const rootNode = this.heap[index]

      while (this.getLeftChildIndex(index) < count) {
        const leftChildIndex = this.getLeftChildIndex(index)
        const rightChildIndex = this.getRightChildIndex(index)

        const smallerChildIndex =
          rightChildIndex < count &&
          this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
            ? rightChildIndex
            : leftChildIndex

        if (this.heap[smallerChildIndex].key <= rootNode.key) {
          this.heap[index] = this.heap[smallerChildIndex]
          index = smallerChildIndex
        } else break
      }

      this.heap[index] = rootNode
    }
  }

  class PriorityQueue extends Heap {
    constructor() {
      super()
    }
  
    //Min Heap 에 넣기
    enqueue = (priority, value) => this.insert(priority, value)
    //Min Heap 에서 삭제하기 (= 우선순위가 가장 높은 노드 꺼내기)
    dequeue = () => this.remove()
    //heap 이 비었는지 체크하기
    isEmpty = () => this.heap.length <= 0
  }


  //use
  let test=new PriorityQueue()

  test.enqueue(2,"a")
  test.enqueue(3,"b")
  test.enqueue(0,"c")
  test.enqueue(1,"d")
  test.enqueue(9,"e")

  console.log(test.heap)

  test.dequeue()
  
  console.log(test.heap)