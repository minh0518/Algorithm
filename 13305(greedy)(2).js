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

   data.shift()

   let distance=(data.shift().split(' ')).map(v => BigInt(v))
   let price=(data.shift().split(' ')).map(v => BigInt(v))					

   let start=0n
   start=distance[0]*price[0]

   let min=price[0]
   for(let i=1; i<price.length-1; i++){
      if(price[i]<min){
         min=price[i]
         start+=(price[i]*distance[i])
      }
      else{
         start+=(min*distance[i])
      }
   }

console.log(start+'')



   process.exit()

})
