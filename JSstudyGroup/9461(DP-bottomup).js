const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []


const check=(num)=>{

  let DP=new Array(num+1).fill(0)

  DP[1]=1
  DP[2]=1
  DP[3]=1
  DP[4]=2
  DP[5]=2


  for(let i=6; i<=num; i++){
    DP[i]=DP[i-5]+DP[i-1]
  }

  return DP

}

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  
  let T=data.shift()

  for(let i=0; i<T; i++){
    let N=Number(data.shift())

    let tmp=check(N)

    console.log(tmp[N])
  }
  

  process.exit()
})


//N번째 삼각형이 그려질때, 그 삼각형의 한 변의 길이

//5개 단위로 빗변에 기대는 단위가 변한다


// 나누기 2했을 때 의 몫까지? x




//6번째는 3번째
//7번재는 2번째
//8번째는 1번째



//9번째는 4번째
//10번째는5번째

//11번째는6번째

//12번째는 7번째

//13번째는 8번째



//처음 3개의 1에는 3개가 의존
//다음 2개의 2에는 2개가 의존

//1 1 1  2 2  3 4 5 7 9 12