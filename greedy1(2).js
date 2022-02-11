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
   let price = data.shift()

   let coin = [500, 100, 50, 10]

   let count = 0

   let i = 0
   while (price) {

      if (price >= coin[i]) {
         count+=parseInt(price / coin[i])
         price %= coin[i]
      }
      i++
   }

   console.log(count)

   process.exit()
})
//500 100 50 10
