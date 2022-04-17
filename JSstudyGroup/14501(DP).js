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
  let N = Number(data.shift())

  let info = data.map((item) => item.split(' ').map(Number))

  let DP = new Array(N).fill(0)
  
  for(let i=0; i<N; i++){
    let [period,cost]=info[i]
    if(i+period<=N){ 
      DP[i]+=cost
      console.log(`i : DP[${i}]=${DP[i]}`)
      for(let j=i+period; j<N; j++){
        DP[j]=Math.max(DP[j],DP[i]) //현재 금액, period일 뒤에 받게 될 금액 비교
        console.log(`j : DP[${j}]=${DP[j]}`)
      }
      console.log(`================`)
    }
  }

console.log(Math.max(...DP))

  process.exit()
})