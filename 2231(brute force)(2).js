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
  let N = Number(data.shift())
  let result = []
  let i = 1


  while(i<N){
  let tmp =i+(i + '').split('').map(Number).reduce((a, b) => a + b)
 
    if (tmp === N) {
      result.push(i)
    }
    i++
  }

  if(result.length){
    console.log(result.reduce((a,b)=>{
      return a>b?b:a
    }))
  }
  else{
    console.log(0)
  }

  process.exit()
})
