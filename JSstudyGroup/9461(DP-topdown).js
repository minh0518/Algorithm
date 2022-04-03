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
  let T = data.shift()

  let DP = new Array(101).fill(0)
  DP = [0, 1, 1, 1, 2, 2, 3, 4, 5, 7, 9, ...DP]

  let fibo = function (N) {
    if (DP[N]) {
      return DP[N]
    } else {
      return (DP[N] = fibo(N - 2) + fibo(N - 3))
    }
  }

  for (let i = 0; i < T; i++) {
    let N=Number(data.shift())
    console.log(fibo(N))
  }

  process.exit()
})
