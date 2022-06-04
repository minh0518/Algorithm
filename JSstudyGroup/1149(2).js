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

  let info=data.map(item=>item.split(' ').map(Number))

  let DP=new Array(N).fill().map(()=>new Array(3).fill(0))

  for(let i=0; i<3; i++){
    DP[0][i]=info[0][i]
  }

  for(let i=1; i<N; i++){
    DP[i][0]=Math.min(DP[i-1][1]+info[i][0],DP[i-1][2]+info[i][0])
    DP[i][1]=Math.min(DP[i-1][0]+info[i][1],DP[i-1][2]+info[i][1])
    DP[i][2]=Math.min(DP[i-1][0]+info[i][2],DP[i-1][1]+info[i][2])
  }

  console.log(Math.min(...DP[N-1]))

  

  process.exit()
})


