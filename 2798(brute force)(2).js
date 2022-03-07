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

   let [N,M]=data.shift().split(' ').map(Number)

   let card=data.shift().split(' ').map(Number)

   let result=0
   
   for(let i=0; i<N; i++){
      for(let j=i+1; j<N; j++){
         for(let k=j+1; k<N; k++){
         let sum=card[i]+card[j]+card[k]
         if(sum<=M && result<sum){
            result=sum
         }
         }
      }
   }

   
  console.log(result)
   process.exit()

})