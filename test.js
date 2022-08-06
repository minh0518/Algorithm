const { count } = require('console')
const { off, mainModule } = require('process')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  
  const dfs=(a,b)=>{

    //범위검사 왜 하냐 싶을텐데 상하좌우로 계속 탐색하다보면
    //무조건 범위 밖으로 벗어나느 경우가 반드시 존재하므로 무조건 해줘야 합니다
      if(a<=-1 ||a>=N || b<=-1 || b>=M){
        return false
      }
    
      if(graph[a][b]==0){
        graph[a][b]=1
        dfs(a - 1, b); //상
        dfs(a + 1, b); //하
        dfs(a, b - 1); //좌
        dfs(a, b + 1); //우
        return true
      }
      else{
        return false
      }
    }
  
    
     let [N, M] = data.shift().split(' ').map(Number) //N이 rols , M이 cols
     let graph = []
  
     graph = data.map((item) => {
        return item.split('').map(Number)
     })
  
  
     result=0
  //3x3이면 N,M도 3이 들어감.
  //실제 배열인덱스는 3개 이므로 [0]~[2]
     for(let i=0; i<N; i++){
       for(let j=0; j<M; j++){
            if(dfs(i,j)){
              result++
            }
       }
     }
  
     console.log(result)
  
  process.exit()
})

// 4 5
// 00110
// 00011
// 11111
// 00000
