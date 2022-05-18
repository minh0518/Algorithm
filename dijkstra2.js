 //출처 : https://github.com/dongkyun-dev/TIL/blob/master/algorithm/%F0%9F%94%B4%EB%8B%A4%EC%9D%B5%EC%8A%A4%ED%8A%B8%EB%9D%BC(dijkstra).md
 //코테를 위한 보다 더 간편한 다익스트라 구현

const { off, mainModule } = require('process')
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

  let graph = Array.from(new Array(N + 1), () => [])

  for (let i = 0; i < E; i++) {
    const [from, to, cost] = input().split(' ').map(Number)
    graph[from].push({ to: to, cost: cost })
  }
  
  let distance = new Array(N + 1).fill(Infinity)

  
  function bfs(x) {
    distance[x] = 0
    let queue = []
    queue.push({ currNode: x, currCnt: 0 })

    while (queue.length) {
  
      queue.sort((a, b) => {
        return a.currCnt - b.currCnt
      })

      const { currNode, currCnt } = queue.shift()

      if (distance[currNode] < currCnt) continue

      for (let i = 0; i < graph[currNode].length; i++) {
        if (
          currCnt + graph[currNode][i]['cost'] <
          distance[graph[currNode][i]['to']]
        ) {
          
          distance[graph[currNode][i]['to']] =
            currCnt + graph[currNode][i]['cost']
          queue.push({
            currNode: graph[currNode][i]['to'],
            currCnt: currCnt + graph[currNode][i]['cost'],
          })
         
        }
      }
    }
  }

  bfs(1)

  console.log(distance[4])
  process.exit()
})
