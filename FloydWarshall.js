const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {


  let INF = Infinity

  let N = 4
  let M = 7

  //'a b c' >> 'a부터 b까지가는데 걸리는 비용c'
  let edge = ['1 2 4', '2 1 3', '1 4 6', '2 3 7', '3 1 5', '3 4 4', '4 3 2']

  let graph = new Array(N + 1).fill().map(() => new Array(N + 1).fill(INF))

  //console.log(graph)

  //자기자신으로 가는 비용은 0으로 초기화(그래프 대각선)
  //0행0열은 안 쓰는 것이므로 버림
  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      if (i === j) graph[i][j] = 0
    }
  }

  //console.log(graph)

  //각 간선의 비용으로 업데이트 
  for (let i = 0; i < M; i++) {
    let [a, b, c] = edge[i].split(' ').map(Number)

    graph[a][b] = c
  }
  
  console.log(graph)


  //플로이드 와샬 알고리즘 수행(k노드 적용)
  for(let k=1; k<N+1; k++){
    for(let a=1; a<N+1; a++){
      for(let b=1; b<N+1; b++){
        graph[a][b]=Math.min(graph[a][b],graph[a][k]+graph[k][b])
      }
    }
  }

  console.log(graph)

  

  process.exit()
})
