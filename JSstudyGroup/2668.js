const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {


  let N=+data.shift()

  // let first=new Array(N).fill().map((_,i)=>i+1)

  // let second=data.map(Number)

  // let table=[]
  // table.push(first)
  // table.push(second)

  let table=new Array(2).fill().map((_,index)=>{
    if(index===0){
      return [0,...(new Array(N).fill().map((_,i)=>i+1))]
    }
    else{
      return [0]
    }
  }) 

  data.map(i=>{
    table[1].push(+i)
  })
  



  const check=(value)=>{
    const first=value[0].sort((a,b)=>a-b)
    const second=value[1].sort((a,b)=>a-b)

    if(JSON.stringify(first)===JSON.stringify(second)){
      return true
    }
  }


  let visited=new Array(N+1).fill(false) //방문배열은 첫번째 줄 기준

  

  let value=new Array(2).fill().map(()=>[])

  const dfs=(start)=>{

    value[0].push(start)
    value[1].push(table[1][start])
    visited[start]=true

    if(!visited[table[1][start]]){ 
        //두번째 줄의 값이 가리키는 첫번쨰 배열을 방문 안 했다면
      dfs(table[1][start])
    }
  }


  let result=[]
  for(let i=1; i<=N; i++){
    dfs(i)
    
    if(check(value)){
        result.push(Number(i))
    }

    //다음 dfs함수를 사용하기 위해 다시 초기화
    visited=new Array(N+1).fill(false) 
    value=new Array(2).fill().map(()=>[])
  }


  console.log(result.length)
  console.log(result.join('\n'))


  



  // 반례
  //1 x 3  x  5 
  //3 x 5  x  1

  // 반례
  //1 2 3  4  5  6
  //3 6 5  1  1  1

  process.exit()
})



//타고타고 가는 것인데
//1이 가리키는 것이 3
//3이 가리키는 것이 1
//5가 가리키는 것이 5



// 1 : [ 3, 1 ]
// 2 : [ 1, 3, 1 ]
// 3 : [ 1, 3 ]
// 4 : [ 5, 5 ]
// 5 : [ 5 ]
// 6 : [ 4, 5, 5 ]
// 7 : [ 6, 4, 5, 5 ]