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


  let visited=new Array(N+1).fill(false) //�湮�迭�� ù��° �� ����

  

  let value=new Array(2).fill().map(()=>[])

  const dfs=(start)=>{

    value[0].push(start)
    value[1].push(table[1][start])
    visited[start]=true

    if(!visited[table[1][start]]){ 
        //�ι�° ���� ���� ����Ű�� ù���� �迭�� �湮 �� �ߴٸ�
      dfs(table[1][start])
    }
  }


  let result=[]
  for(let i=1; i<=N; i++){
    dfs(i)
    
    if(check(value)){
        result.push(Number(i))
    }
    visited=new Array(N+1).fill(false) 
    value=new Array(2).fill().map(()=>[])
  }


  console.log(result.length)
  console.log(result.join('\n'))


  



  // �ݷ�
  //1 x 3  x  5 
  //3 x 5  x  1

  // �ݷ�
  //1 2 3  4  5  6
  //3 6 5  1  1  1

  process.exit()
})



//Ÿ��Ÿ�� ���� ���ε�
//1�� ����Ű�� ���� 3
//3�� ����Ű�� ���� 1
//5�� ����Ű�� ���� 5



// 1 : [ 3, 1 ]
// 2 : [ 1, 3, 1 ]
// 3 : [ 1, 3 ]
// 4 : [ 5, 5 ]
// 5 : [ 5 ]
// 6 : [ 4, 5, 5 ]
// 7 : [ 6, 4, 5, 5 ]