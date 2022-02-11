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
   let [N, K] = data.shift().split(' ').map(Number)
   let count = 0
   while (N !== 1) {
      count++
      if (N % K !== 0) {
         N--
      } else {
         N /= K
      }
   }

   console.log(count)

   process.exit()
})
