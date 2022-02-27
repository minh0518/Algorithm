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
   let [y, x] = data.shift().split('')
   y = y.charCodeAt(0) - 96

   let [dx, dy] = [
      [-2, -1, 2, 1, 2, 1, -2, -1],
      [1, 2, 1, 2, -1, -2, -1, -2],
   ]

   let count = 0

   for (let i = 0; i < 8; i++) {
      nx = Number(x) + dx[i]
      ny = y + dy[i]

      if (!(nx > 8 || nx < 1 || ny > 8 || ny < 1)) {
         count++
      }
   }

   console.log(count)

   process.exit()
})