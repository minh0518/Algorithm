const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let N = +data.shift()
  let find = +data.shift()
  let arr = new Array(N).fill().map(() => new Array(N).fill(0))

  //ÇÏ¿ì»óÁÂ
  let [dx, dy] = [
    [1, 0, -1, 0],
    [0, 1, 0, -1],
  ]

  arr[0][0] = N * N

  let count = 0
  let [x, y] = [0, 0]
  let [nx, ny] = [x, y]
  let i = 0
  let value = N * N - 1

  while (count !== N * N - 1) {
    nx = x + dx[i % 4]
    ny = y + dy[i % 4]

    if (nx >= N || ny >= N || nx < 0 || ny < 0 || arr[nx][ny] !== 0) {
      i++
      continue
    }
    arr[nx][ny] = value--
    count++
    [x, y] = [nx, ny]
  }

  console.log(arr.map((i) => i.join(' ')).join('\n'))

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][j] === find) {
        console.log(i + 1, j + 1)
      }
    }
  }

  process.exit()
})

// 49 26 27 28 29 30 31
// 48 25 10 11 12 13 32
// 47 24  9  2  3 14 33
// 46 23  8  1  4 15 34
// 45 22  7  6  5 16 35
// 44 21 20 19 18 17 36
// 43 42 41 40 39 38 37
