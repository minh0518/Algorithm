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
  let DP=new Array(N+1).fill(0)
  //DP[0] = 0
  DP[1] = 1

  for (let i = 1; i <= N ; i++) { //각 숫자들에 대해 값을 구하기 시작
    DP[i] = DP[i - 1] + 1
    for (let j = 1; j <= Math.sqrt(i); j++) { 
      if (DP[i - j ** 2] + 1 < DP[i]) {
        DP[i] = DP[i - j ** 2] + 1
      }
    }
  }

  console.log(DP[N])



  process.exit()
})

//반례
//43
//6+2+1+1+1
//5+3+3