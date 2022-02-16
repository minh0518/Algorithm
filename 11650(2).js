const { NOTFOUND } = require('dns')
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

   let num = data.map((item) => item.split(' ').map(Number))

   num.sort((a, b) => {
      if (a[0] == b[0]) {
         return a[1] - b[1]
      } else {
         return a[0] - b[0]
      }
   })
   let result = []
   num.map((item) => {
      result.push(item.join(' '))
   })

   console.log(result.join('\n'))
   process.exit()
})
