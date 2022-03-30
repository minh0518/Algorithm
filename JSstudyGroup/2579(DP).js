const { off, mainModule } = require('process')
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

  let N=Number(data.shift())

  let scores=data.map(Number)

  let DP=new Array(N).fill(0)

  DP[0]=scores[0]
  DP[1]=scores[0]+scores[1]
  DP[2]=Math.max(scores[0]+scores[2],scores[1]+scores[2])

  for(let i=3; i<N; i++){
    DP[i]=Math.max(DP[i-3]+scores[i-1]+scores[i],DP[i-2]+scores[i])
  }



  console.log(DP[N-1])
  //console.log(DP[DP.length-1])

  process.exit()
})

