const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  
  let [N,M]=data.shift().split(' ').map(Number)

  let result=[]
  if(N===1){
    result.push(1)
  }
  else if(N===2){
    result.push(Math.min(parseInt((M+1)/2),4))
  }
  else if(N>2){
    if(M>=7){
      result.push(M-2)
    }
    else if(M===6 || M===5){
      result.push(4)
    }
    else if(M<=4){
      result.push(Math.min(M,4))
    }
  }

  console.log(result.shift())


  
  process.exit()
})


//처음 있던 자리도 포함이니까
//이동횟수가 3번까지
//방문한 칸은 4개까지


//7칸이면 1칸씩가도 4번이 끝
//그렇다면 다른 옵션 다 사용하면 5번까지 가능

//다른 옵션 다 사용할 수 있는 최소가 7칸부터


