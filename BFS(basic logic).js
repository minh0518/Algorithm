const { off } = require('process')
const readline = require('readline')
const { callbackify } = require('util')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  const bfs = (graph, start, visited) => {
    let queue = []
    queue.push(start)

    visited[start] = true

    while (queue.length !== 0) {
      let v = queue.shift()
      console.log(v)

      for (let i of graph[v]) {
        if (!visited[i]) {
          queue.push(i)
          visited[i] = true
        }
      }
    }
    
  }

  const graph = [
    [],
    [2, 3, 8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7],
  ]

  let visited = []
  for (let i = 0; i < 9; i++) {
    visited.push(false)
  }

  bfs(graph, 1, visited)

  process.exit()
})
