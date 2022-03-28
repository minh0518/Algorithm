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
  //M이 가로 길이  , N이 세로 길이
  //좌표도 가로,세로 (행,열 개념이 아님..이 아니라 맞는거같은데?)
  //좌표는 0부터 시작

  let T = data.shift()
  let [M, N, K] = []
  let graph = []

  const DFS = (x, y) => {
    if (x >= 0 && x < M && y >= 0 && y < N) {
      if (graph[x][y] === 1) {
        graph[x][y] = 0
        DFS(x + 1, y) //아래
        DFS(x, y + 1) //오른쪽
        DFS(x - 1, y) //위
        DFS(x, y - 1) //왼쪽
      } else {
        //재귀 함수 종료조건
        return
      }
    }
  }

  for (let i = 0; i < T; i++) {
    [M, N, K] = data.shift().split(' ').map(Number)

    let location = []
    for (let i = 0; i < K; i++) {
      location.push(data.shift().split(' ').map(Number))
    }

    graph = new Array(M) 
    for (let i = 0; i < M; i++) {
      graph[i] = new Array(N).fill(0)
    }//이렇게 하면 세로(=행)의 길이는 M이고 가로의 길이(=열)는 N이 됨
    //N개의 길이를 가진 배열들이 M개가 되는 것
    //이건 확실하게 문제에서 말한 가로가 M이고 세로가 N이라는 것과 틀리다

    for (let i = 0; i < K; i++) {
      graph[location[i][0]][location[i][1]] = 1
    }

    let count = 0
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        if (graph[i][j] === 1) {
          DFS(i, j)

          count++
        }
      }
    }

    console.log(count)
  }

  process.exit()
})
