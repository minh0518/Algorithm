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
    //개미전사

  let N=data.shift()
  let K=data.shift().split(' ').map(Number)

  let D=new Array(100).fill(0) //D는 해당 인덱스까지 털었을 때
                          //가장 최적의 값(=정답)들을 담고 있음

  D[0]=K[0]
  D[1]=Math.max(K[0],K[1])

  for(let i=2; i<N; i++){
    D[i]+=Math.max(D[i-1],D[i-2]+K[i])
  }

  console.log(D[N-1])

  console.log(D)  
  process.exit()
})


