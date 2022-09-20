const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [M, N] = data.shift().split(' ').map(Number)

  let soldiers = data.map((i) => i.split(''))

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ]

  let white = 0
  let blue = 0

  const dfs = (x, y, count, color) => {
    soldiers[x][y] = 0

    let tmpCount = count
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i]
      let ny = y + dy[i]

      if (nx >= 0 && nx < M && ny >= 0 && ny < N) {
        if (soldiers[nx][ny] === color) {
          tmpCount = dfs(nx, ny, tmpCount + 1, color)
        }
      }
    }

    return tmpCount
  }

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (soldiers[i][j] === 'W') {
        white += dfs(i, j, 1, 'W') ** 2
      }
    }
  }

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (soldiers[i][j] === 'B') {
        blue += dfs(i, j, 1, 'B') ** 2
      }
    }
  }

  console.log(white, blue)
  process.exit()
})
