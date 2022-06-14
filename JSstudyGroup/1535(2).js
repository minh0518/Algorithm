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

  let DP=new Array(100).fill(0)
  let N=+data.shift()
  let health=data.shift().split(' ').map(Number)
  let happy=data.shift().split(' ').map(Number)
 
  for(let i=0; i<N; i++){
    for(let j=99; j>=health[i]; j--){
      DP[j]=Math.max(DP[j],DP[j-health[i]]+happy[i])
    }
  }

  console.log(DP[99])


  process.exit()
})