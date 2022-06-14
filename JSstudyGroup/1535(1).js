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

  let health=data.shift().split(' ').map(Number)
  health.unshift(0)
  let happy=data.shift().split(' ').map(Number)
  happy.unshift(0)

  let DP=new Array(N+1).fill().map(()=>new Array(101).fill(0))
  //DP[i][j]
  //i번째 사람, 남은 체력이 j 일때  최대 행복값




  for(let i=1; i<=N; i++){
    for(let j=100; j>0; j--){
      if(j-health[i]>0){ //죽지 않는다면
        DP[i][j]=Math.max(DP[i-1][j],DP[i-1][j-health[i]]+happy[i])
      }
      else{
        DP[i][j]=DP[i-1][j]
      }
    }
  }

  let result=0
  for(let i=100; i>0; i--){
    result=Math.max(DP[N][i],result)
  }

  console.log(result)
  

  process.exit()
})