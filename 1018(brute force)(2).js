const { info } = require('console')
const { off } = require('process')
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
  let [a, ...b] = data
  let [N, M] = a.split(' ')

  let board = b.map((item) => item.split(''))

  let answer = ['WBWBWBWB', 'BWBWBWBW']
  let count = 0
  let result = []
  for (let i = 0; i <= N - 8; i++) {
    for (let j = 0; j <= M - 8; j++) {

      for (let k = 0; k < 2; k++) {
        count = 0

        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++) {
            if (answer[(x + k) % 2][y] !== board[x + i][y + j]) {
              count++
            }
          }
        }
        result.push(count)
      }
    }
  }


  console.log(result.reduce((x, y) => {
    return x < y ? x : y
  }))

  process.exit()
})
