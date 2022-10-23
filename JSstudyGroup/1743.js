const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, M, K] = data.shift().split(' ').map(Number)

  let cord = data.map((i) => i.split(' ').map(Number))

  let map = new Array(N).fill().map(() => new Array(M).fill(0))

  //그래프 생성
  cord.map((i) => {
    let [x, y] = i
    map[x - 1][y - 1] = 1 //배열좌표니까
  })

  let visited = new Array(N).fill().map(() => new Array(M).fill(false))

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ]

  const dfs = (x, y) => {
    let result = 1

    visited[x][y] = true

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i]
      let ny = y + dy[i]

      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        if (map[nx][ny] === 1 && !visited[nx][ny]) {
          result += dfs(nx, ny)
        }
      }
    }

    return result
  }

  let answer=[]
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 1 && !visited[i][j]) {
        answer.push(dfs(i, j))
      }
    }
  }

  console.log(Math.max(...answer))
  

  process.exit()
})

//이전에 dfs나 bfs에서 방문을 안했을 로직수행을 어떻게 구현했더라?
//배추문제에서는 count어떻게 구현했지?

//dfs사용하는 if문 아래에다가 else로 리턴하면 안됨 나머지 for문이 있는데 왜

//이건 +하면서 가면안된다
//조합때처럼 +하는건 외부에 전역변수에 계속 추가를 하는거고
//지금은 최종적으로 리턴을 받아야 하는 것이다