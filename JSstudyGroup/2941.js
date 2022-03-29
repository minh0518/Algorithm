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

  let word=data.shift()
  
  let target=['c=','c-','dz=','d-','lj','nj','s=','z=']
  
  
  for(let i of target){
    word=word.split(i).join('A')
  }

  console.log(word.length)
  

  process.exit()
})
