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
  let T = data.shift()

  for (let i = 0; i < T; i++) {
    let [N, M] = data.shift().split(' ').map(Number)
    let tmp = data.shift().split(' ').map(Number)
    let gold = []

    for (let i = 0; i < N; i++) {
      gold.push([])
      for (let j = 0; j < M; j++) {
        gold[i].push(tmp.shift())
      }
    }//이렇게 해도 되는데 slice를 활용해보자

    //gold의 각 열좌표가 한 층을 의미
    let DP = new Array(N)
    for (let i = 0; i < N; i++) {
      DP[i] = new Array(M).fill(0)
    } 


    for (let i = 0; i < N; i++) {
      //초깃값
      DP[i][0] = gold[i][0]
    }
 
    for(let i=1; i<M; i++){//열은 1부터. 열을 기준으로 각 행값들을 비교
      for(let j=0; j<N; j++){//행은 0부터
        //행의 범위만 찾아주면 됨
        if(j===0){
          DP[j][i]=Math.max(DP[j][i-1],DP[j+1][i-1])+gold[j][i]
        } 
        else if(j===N-1){//3개를 다 묶어야 하므로 반드시 else if로 써야 한다
          DP[j][i]=Math.max(DP[j][i-1],DP[j-1][i-1])+gold[j][i]        
        }
        else{
          DP[j][i]=Math.max(DP[j][i-1],DP[j-1][i-1],DP[j+1][i-1])+gold[j][i]
        }
      }
    }

    let result = []
    for (let i = 0; i < N; i++) {
      result.push(DP[i][M - 1])
    }

    console.log(Math.max(...result))
    //console.log(DP)
  }

  process.exit()
})