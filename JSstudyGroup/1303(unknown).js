const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input.trim())
}).on('close', () => {
  let [M, N] = data.shift().split(' ').map(Number)

  let visited = new Array(M).fill().map(() => new Array(N).fill(false))

  let soldiers = data.map((i) => i.split(''))

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ]

  let white=0
  let blue=0
  
  const dfs = (x, y, color) => {
    visited[x][y] = true

    let count = 1

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i]
      const ny = y + dy[i]

      if (nx < 0 || nx >= M || ny < 0 || ny >= N) continue

      if (soldiers[nx][ny] !== color) continue
      if (!visited[nx][ny]) {
        count += dfs(nx, ny, color)
      }
    }

    return count
  }

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (soldiers[i][j] === 'W' && !visited[i][j]) {
        white+=dfs(i, j, 'W')**2
      }
    }
  }

  
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (soldiers[i][j] === 'B' && !visited[i][j]) {
        blue+=dfs(i, j, 'B')**2
      }
    }
  }

  console.log(white,blue)


  process.exit()
})