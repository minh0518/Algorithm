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

  let N=data.shift()
  let count=0

  for(let i=0; i<=N; i++){
    for(let j=0; j<60; j++){
      for(let k=0; k<60; k++){
        if(String(i).includes('3') || String(j).includes('3') || String(k).includes('3')){
          count++
        }
      }
    }
  }

  console.log(count)

   process.exit()
})


