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

   let inputString=data.shift().split('')
   let M=+data.shift()
   let command=data.map(item=>item.split(' '))

   let lStack=inputString
   let rStack=[]
   

   for(let i=0; i<command.length; i++){
      if(command[i][0]==='L'&&lStack.length){
         rStack.push(lStack.pop())
      }
      if(command[i][0]==='D'&&rStack.length){
         lStack.push(rStack.pop())
      }
      if(command[i][0]==='B'){
         lStack.pop()
      }
      if(command[i][0]==='P'){
         lStack.push(command[i][1])
      }
   }

   console.log(lStack.join('')+rStack.reverse().join(''))


  process.exit()
})
