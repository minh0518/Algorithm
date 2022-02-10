const { stat } = require('fs')
const { off } = require('process')
const readline = require('readline')

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
})

const data = []

rl.on('line', (input) => {
   data.push(input)
}).on('close', () => {
   
   let N=data.shift()
   let result=1
   let range=1
   let block=1
   while(1){
      if(N==1){
         break
      }
      block+=range*6

      if(N<=block){
         result=(range+1)
         break
      }

      range++
   }

   console.log(result)



   process.exit()
})
