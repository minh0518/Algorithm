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

   let removeSub=N.split('-')
   
   
   let numbers=[]

   for(let i of removeSub){
      if(i.includes('+')){
         let tmp=i.split('+')
         let sum=(tmp.map(Number)).reduce((a,b)=>a+b)
         numbers.push(sum)
      }
      else{
         numbers.push(i)
      }
   }

   let answer=(numbers.map(Number)).reduce((a,b)=>a-b)

   console.log(answer)
   process.exit()

})