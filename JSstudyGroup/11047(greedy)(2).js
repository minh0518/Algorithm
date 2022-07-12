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
  let [N, K] = data.shift().split(' ').map(Number)
  let coins = data.map(Number)

  let count = 0
  coins.reverse()

  for (let i = 0; i < N; i++) {
    if (coins[i] > K) continue

    while (1) {
      if (coins[i] > K) break

      K -= coins[i]
      count++
    }
  }

  console.log(count)

  process.exit()
})
