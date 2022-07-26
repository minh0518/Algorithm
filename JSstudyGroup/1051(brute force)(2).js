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

  let rect = data.map((i) => i.split('').map(Number))

  let min = Math.min(N, M)

  let result = []
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      for (let k = 0; k < min; k++) {
        if (i + k >= N || j + k >= M) continue

        let a = rect[i][j]
        let b = rect[i + k][j]
        let c = rect[i][j + k]
        let d = rect[i + k][j + k]

        if (a === b && b === c && c === d) {
          result.push(k + 1)
        }
      }
    }
  }

  //console.log(result)

  console.log(Math.max(...result) ** 2)

  process.exit()
})