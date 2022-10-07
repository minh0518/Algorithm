const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  let [N, e, w, s, n] = data.shift().split(' ').map(Number)

  let probs=[e, w, s, n]

  let visited = new Array(30).fill().map(() => new Array(30).fill(false))

  let [dx, dy] = [
    [0, 0, 1, -1],
    [1, -1, 0, 0],
  ]

  let result=0
  const dfs = (i, j, count, prob) => {

    console.log(prob)
    if(count===N){
      return  result+=prob
    }

    visited[i][j] = true

    for (let i = 0; i < 4; i++) {
      let nx = i + dx[i]
      let ny = j + dy[i]

      if (!visited[nx][ny]) {
        dfs(nx,ny,count+1,(prob*(probs[i])/100))
      }
    }
  }

  console.log( dfs(14,14,1,1))





  process.exit()
})

//이동 경로가 단순한 것을 구하는 것이므로
//dfs로 탐색하다가 단순하지 않은 경우를 만나면 백
//단순한 경로로 움직인 경우의 수만 구하면 될듯
