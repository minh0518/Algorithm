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

  let N=+data.shift()

  let DP=new Array(N).fill(0)

  DP[0]=3
  DP[1]=7
  for(let i=2; i<N; i++){
    DP[i]=(DP[i-2]+DP[i-1]*2)%9901
  }
  
  console.log(DP[N-1]%9901)



  process.exit()
})


