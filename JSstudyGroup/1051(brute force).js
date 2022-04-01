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

  let [N,M]=data.shift().split(' ').map(Number)
  let num=data.map(item=>item.split('').map(Number))


  let min=Math.min(N,M) //두 변중 작은 변 선택

  let result=[]
  //전체 요소 순회
  for(let i=0; i<N; i++){
    for(let j=0; j<M; j++){

      // 특정 좌표를 기준으로 두 변N,M중 가장 작은 변까지 더해가며
      // 같은 숫자가 있는지 확인한다
      for(let k=0; k<min; k++){
        if(i+k<N && j+k<M){ //사격형 범위 안 넘어가는지 확인
           let a=num[i][j]
           let b=num[i+k][j]
           let c=num[i][j+k]
           let d=num[i+k][j+k]

           if(a==b && c==d && a==c && a==d  && b==c && b==d){
            result.push(k+1)
          }
        }
      }
    }
  }


  console.log(Math.max(...result)**2) 

  
  process.exit()
})

