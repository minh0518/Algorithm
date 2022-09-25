const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number)

  let friendInfo = data.map((i) => i.split(' ').map(Number))

  let friendStatus = {}

  friendInfo.map((i) => {
    friendStatus[i[0]] = [...(friendStatus[i[0]] || []), i[1]]
    friendStatus[i[1]] = [...(friendStatus[i[1]] || []), i[0]]
  })

  //console.log(friendStatus)





  const bfs=(node,target)=>{
    let visited = new Array(N + 1).fill(false) 
    //여러번 사용하기 때문에 반드시 여기다 visited를 해줘야 함

    let queue=[]
    queue.push([node,1])
    visited[node]=true


    while(queue.length){
      let [v,count]=queue.shift()
      
      for(let i of friendStatus[v]){
        if(friendStatus[v].find(element=>target===element)){
          return count
        }
        else{
          if(!visited[i]){
            queue.push([i,count+1])
            visited[i]=true
          }
        }
      }
    }
  }



  let result=new Array(N+1).fill(0)

  for(let i=1; i<=N; i++){
    let sum=0
    for(let j=1; j<=N; j++){
      if(i===j) continue
      sum+=bfs(i,j)
    }

    result[i]=sum
  }

  result.shift()

  console.log(result.indexOf(Math.min(...result))+1)
 


  process.exit()
})

// 1 : 3,4
// 2 : 3
// 3 : 4
// 4 : 5
