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

  let X = Number(data.shift())

  let DP = new Array(X + 1).fill(0)

  for (let i = 2; i <= X; i++) {
  
   
    if (i % 2 === 0) {
      DP[i] = Math.min(DP[i / 2] + 1, DP[i - 1] + 1 )
    }
  
    if (i % 3 === 0) {
      DP[i] = Math.min(DP[i / 3] + 1, DP[i - 1] + 1 )
    }
    
  }

  console.log(DP)


  process.exit()
})

