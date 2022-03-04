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

   let tmp = data.map((item) => item.split(' ').map(Number))



   tmp.sort((a, b) => {

      if(a[1]==b[1]){
         return a[0] - b[0]
      }
         return a[1] - b[1]
      
      
   })

   let result = [tmp[0]] //[ [ 1, 4 ] ]
   let index = 0
   for (let i = 1; i < tmp.length; i++) {
      if (tmp[i][0] >= result[index][1]) {
         result.push(tmp[i])
         index++
      }
   }

  console.log(result.length)


   process.exit()
})
