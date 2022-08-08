const { count, time } = require('console')
const { off, mainModule } = require('process')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, M, V] = data.shift().split(' ').map(Number)

  let tmp = data.map((i) => i.split(' ').map(Number))

  //+1을 해줘야 하는게 이 문제에서 사용되는 좌표는 0부터가 아니라
  //1부터이므로 반드시 +1을 해줘야 한다
  let graph = new Array(N + 1).fill().map(() => [])
  for (let i = 0; i < tmp.length; i++) {
    graph[tmp[i][0]].push(tmp[i][1])
    graph[tmp[i][1]].push(tmp[i][0])
    //양방향이므로 둘 다 해줘야 한다
		//기본적으로 dfs,dfs는 양방향이고
		//중복이더라도 둘 다 해줘야 한다
		//ex 1->2 , 2->1
  }

//이 문제에서 방문할 수 있는 정점이 여러 개인 경우에는 
//정점 번호가 작은 것을 먼저 방문한다고 했으므로 정렬을 해줘야한다
  graph = graph.map((i) => {
    return i.sort((a, b) => a - b)
  })
//[ [],[],[5,1]]  => //[ [],[],[1,5]]

  let dfsVisited = new Array(N + 1).fill(false)
  let bfsVisited = new Array(N + 1).fill(false)
  let dfsResult = []
  let bfsResult = []

  const dfs = (start) => {
    dfsVisited[start] = true
    dfsResult.push(start)

	//일부러 for of을 사용하지 않고 일일이 인덱스로 구현
    for (let i = 0; i < graph[start].length; i++) {
      if (!dfsVisited[graph[start][i]]) {
        dfs(graph[start][i])
      }
    }
  }

  const bfs = (start) => {
    let queue = []
    queue.push(start)
    bfsVisited[start] = true

    while (queue.length) {
      let v = queue.shift()
      bfsResult.push(v)
	//일부러 for of을 사용하지 않고 일일이 인덱스로 구현
      for (let i = 0; i < graph[v].length; i++) {
        if (!bfsVisited[graph[v][i]]) {
          queue.push(graph[v][i])
          bfsVisited[graph[v][i]] = true
        }
      }
    }
  }

  dfs(V)
  bfs(V)

  console.log(dfsResult.join(' '))
  console.log(bfsResult.join(' '))

  process.exit()
})