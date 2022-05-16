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

  let N=+data.shift()
  let numbers=data.shift().split(' ').map(Number)
  

  for(let i=1; i<N; i++){
    numbers[i]=Math.max(numbers[i],numbers[i]+numbers[i-1])
  }

  console.log(Math.max(...numbers))
  

  process.exit()
})
