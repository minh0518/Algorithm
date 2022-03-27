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

  let arr = new Array(10).fill(true).fill(false, 0, 2)

  console.log(arr)
  
  process.exit()
})
