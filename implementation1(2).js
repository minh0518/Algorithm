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
   let move = data.shift().split(' ')
   let [dx, dy] = [
      [0, -1, 0, 1],
      [1, 0, -1, 0],
   ] //R U L D
   let start = [1, 1]
   let [nx, ny] = [0, 0]
   let command = ['R', 'U', 'L', 'D']

   for (let i of move) {
      for (let j = 0; j < command.length; j++) {
         if (i === command[j]) {
            nx = start[0] + dx[j]
            ny = start[1] + dy[j]
            if (!(nx < 1 || ny < 1 || nx > N || ny > N)) {
               start[0] = nx
               start[1] = ny
            }
         }
      }
   }

   console.log(start.join(' '))

   process.exit()
})
