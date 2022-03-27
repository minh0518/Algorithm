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

  let N =Number(data.shift())
  let pair =Number(data.shift())
  let graph = [...new Array(N + 1)].map(() => []);
  let visited=new Array(N+1).fill(false)


  for (let i = 0; i < pair; i++) {
    let [start,end] = data[i].split(' ').map(Number)
    graph[start].push(end)
    graph[end].push(start)
  }


  //console.log(graph)

  let count=0;

  const bfs = (graph, start, visited) => {
    let queue = []
    queue.push(start)

    visited[start] = true
		//count++

    while (queue.length !== 0) {
      let v = queue.shift()
      
      for (let i of graph[v]) {
        if (!visited[i]) {
          queue.push(i)
          visited[i] = true
          count++
        }
      }

    }
  }
  
  
  bfs(graph, 1, visited)

  console.log(count)


  process.exit()
})