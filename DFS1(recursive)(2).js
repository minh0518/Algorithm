const { count } = require('console')
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
  let [N, M] = data.shift().split(' ').map(Number)
  let board = data.map((i) => i.split('').map(Number))

  let cord = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  const dfs = (i, j) => {
    board[i][j] = 1

    for (let k = 0; k < cord.length; k++) {
      if (
        i + cord[k][0] <= -1 ||
        i + cord[k][0] >= N ||
        j + cord[k][1] <= -1 ||
        j + cord[k][1] >= M
      ) {
        continue
      }
      if (board[i + cord[k][0]][j + cord[k][1]] === 0) {
        dfs(i + cord[k][0], j + cord[k][1])
      }
    }
  }

  let result = 0
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0) {
        dfs(i, j)
        result++
      }
    }
  }

  console.log(result)

  process.exit()
})

// 4 5
// 00110
// 00011
// 11111
// 00000
