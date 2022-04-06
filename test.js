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
  //let num=data.map(item=>item.split('').map(Number))

  let num=new Array(N)
  for(let i=0; i<N; i++){
    num[i]=data[i].split('').map(Number)
  }

  let min=Math.min(N,M) //두 변중 작은 변 선택


  
  let result=1
  
  for(let i=0; i<N; i++){
    for(let j=0; j<M; j++){

      // 기존에는 처음부터 전체 사각형에서 최솟값을 구해놓고 거기까지 차례대로 봤다면
      // 지금은 
      for(let k=1; k<min; k++){
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

