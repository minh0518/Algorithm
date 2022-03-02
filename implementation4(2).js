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
   let tmp = data.shift().split('')
   let word = []
   let num = 0
   for (let i of tmp) {
      if (Number(i) || i === '0') {
         num += Number(i)
      } else {
         word.push(i)
      }
   }

   word.sort()

   let result = word.join('')

   if (num) {
      result += num
   }

   console.log(result)

   process.exit()
})
