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

   let k = Number(data.shift())
   let n = Number(data.shift())

   let num = []
    let tmp=0
   for (let i = 0; i <= k; i++) {
      num.push([1])
      for (let j = 2; j <= n; j++) {
         if (i == 0) {
            num.push(j)
         } 
         else {
            for (let k = 1; k <=n; k++) {
               tmp+=num[i - 1][k]
            }
            num.push(tmp)
         }
      }
   }

   console.log(num)

   process.exit()
})

//kÃþ¿¡ nÈ£

//  1   4   10  20  35    //2
//  1   3   6   10   15  //1
//  1  2   3   4   5    //0
