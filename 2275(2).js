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
   let N = data.shift()

   for (let count = 0; count < N; count++) {
      let k = Number(data.shift())
      let n = Number(data.shift())

      let num = []
      let tmp = 0
      for (let i = 0; i <= k; i++) {
         //Ãþ
         num.push([1])
         for (let j = 1; j < n; j++) {
            //È£ (1È£´Â Á¦¿Ü)
            if (i == 0) {
               num[0].push(j + 1)
            } 
            else {
               tmp=num[i][j-1]+num[i-1][j]
               num[i].push(tmp)
            }
         }
      }

      console.log(num)
   }

   process.exit()
})

//kÃþ¿¡ nÈ£

//  1   4   10  20  35    //2
//  1   3   6   10   15  //1
//  1  2   3   4   5    //0
