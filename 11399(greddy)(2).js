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
   let time=data.shift().split(' ').map(Number)
   let result=0

   time.sort((a,b)=>a-b)

   
   for(let i=0; i<N; i++){
      for(let j=0; j<=i; j++){
         result+=time[j]
      }
      console.log(result)
   }

//   console.log(result)

   process.exit()
})
//