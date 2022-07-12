const { count } = require('console')
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
  let T = Number(data.shift())

  let [M, N, K] = []
  //M이 가로 , N이 세로
  //좌표는 열,형 (가로,세로)

  const dfs = (i, j, farm) => {
    if (i >= 0 && i < N && j >= 0 && j < M) {
      if (farm[i][j] === 1) {
        farm[i][j] = 0

        dfs(i - 1, j, farm)
        dfs(i + 1, j, farm)
        dfs(i, j - 1, farm)
        dfs(i, j + 1, farm)
      } else {
        return
      }
    }
  }

  for (let t = 0; t < T; t++) {
    [M, N, K] = data.shift().split(' ').map(Number)

    let location = []
    for (let k = 0; k < K; k++) {
      location.push(data.shift().split(' ').map(Number))
    }

    let farm = new Array(N).fill().map(() => new Array(M).fill(0))

    location.map((item) => (farm[item[1]][item[0]] = 1))
    //좌표가 열,행으로 주어져서 [1] [0] 순으로 넣어야 함
    let count = 0
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (farm[i][j] === 0) continue

        dfs(i, j, farm)

        count++
      }
    }

    console.log(count)
  }

  process.exit()
})
