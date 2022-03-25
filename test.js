const { resolve } = require('path')
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
  let word=[
    'cbaedf', 'dcbaef',
    'baedcf', 'cbadfe'
  ]
  console.log(word)
  let result=word.sort((a,b)=>{
      return a.localeCompare(b)
    })
  
    
  console.log(result)
  

})



