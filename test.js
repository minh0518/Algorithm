const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let N = +data.shift()

  let bridge = data.shift().split(' ').map(Number)

  let target = data.shift().split(' ').map(Number)

  let graph = new Array(N + 1).fill().map(() => [])

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (j + bridge[i] <= N) {
        graph[i + 1].push(j + bridge[i])

        if (bridge[i] !== 1) {
          //해당 인덱스를 기반으로 계속
          j += bridge[i] - 1 //j++를 해주는 것 때문에 -1해줘야함
        }
      }
    }
  }

  console.log(graph)

  //[1]는 2,3,4,5번째로 이동가능
  //[2]는 4번째로 이동가능

  const bfs = (node, end) => {
    let visited = new Array(N + 1).fill(false)

    let queue = []
    queue.push([node, 1])
    visited[node] = true

    while (queue.length) {
      let [v, depth] = queue.shift()

      for (let i of graph[v]) {
        if (graph[v].includes(end)) {
          return depth
        } else {
          if (!visited[i]) {
            queue.push([i, depth + 1])
            visited[i] = true
          }
        }
      }
    }
  }

  let result = bfs(target[0], target[1])
  if (result === undefined) {
    console.log(-1)
  } else {
    console.log(result)
  }

  process.exit()
})

// [
//   []
//   1번째 징검다리는 인덱스(1,2,3,4)의 징검다리로 이동가능
//   1 [1,2,3,4]
//   2 [3]
//   3 [4]
//   4 [4]
//   []
// ]

//케빈베이컨 문제처럼 이렇게 타고타고
//2 3 2 1 2 8 5
//2 7

//[ [], [ 3, 5, 7 ], [ 5 ], [ 5, 7 ], [ 5, 6, 7 ], [ 7 ], [], [] ]
// 7
// 2 3 2 1 2 8 5
// 2 7