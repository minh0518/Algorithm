const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, W, L] = data.shift().split(' ').map(Number)

  let weights = data.shift().split(' ').map(Number)

  let count = 0
  let queue = new Array(W).fill(0)

  while (queue.length) {
    queue.shift()
    count++

    let currentTruck = weights[0]
    if (weights.length) {
      if (queue.reduce((a, b) => a + b, 0) + currentTruck > L) {//못 들어감
        queue.push(0) //큐의 왼쪽에서 땡김
      } else {
        queue.push(currentTruck) //큐의 오른쪽에 추가
        weights.shift()
      }
    }
  }

  console.log(count)

  process.exit()
})

//다리에는 한번에 최대 w대의 트럭만 올라갈 수 있음
//다리를 건너려면 다리에서 w번 이동해야 함
//최대하중 L

//마지막까지 다 넘어간 시간까지 체크해야 함