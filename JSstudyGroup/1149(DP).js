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
 

  let N=data.shift()
  // let price=new Array(N)
  // for(let i=0; i<N; i++){
  //   price[i]=data.shift().split(' ').map(Number)
  // }
  let price=data.map(item=>item.split(' ').map(Number))
  //price�� ù��° �ε����� ��, �ι�° �ε����� �� ���� ���� �����

  let DP=new Array(N)
  for(let i=0; i<N; i++){
    DP[i]=new Array(3).fill(0)
  }


  DP[0][0]=price[0][0]
  DP[0][1]=price[0][1]
  DP[0][2]=price[0][2]

  for(let i=1; i<N; i++){
    DP[i][0]=Math.min(DP[i-1][1],DP[i-1][2])+price[i][0]
    DP[i][1]=Math.min(DP[i-1][0],DP[i-1][2])+price[i][1]
    DP[i][2]=Math.min(DP[i-1][0],DP[i-1][1])+price[i][2]
  }

  console.log(Math.min(...DP[N-1]))


  
  
  process.exit()
})

//�پ��ִ� �͵鳢���� ���� �ٸ��� ��