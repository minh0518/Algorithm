const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  let [N,K]=data.shift().split(' ').map(Number)
  //N�� ��ü ��
  //0�� ����
  //K�� ���� 

  
  //N�� ������ ���� ���� ��� ���� �迭 �ε�������
  let target=data.map(Number)

  let graph=new Array(N).fill().map(()=>[])

  for(let i=0; i<N; i++){
    graph[i].push(target[i])
  }


  const bfs=(node,target)=>{

    let visited=new Array(N).fill(false)

    let queue=[]
    queue.push([node,1])
    visited[node]=true

    while(queue.length){

      let [v,depth]=queue.shift()

      if(graph[v][0]===target){
        return depth
      }
      else{
        if(visited[[graph[v][0]]]){
          return 
        }
        queue.push([graph[v][0],depth+1])
        visited[graph[v][0]]=true
      }
    }
  }


  let result=bfs(0,K)
  if(result){
    console.log(result)
  }
  else{
    console.log(-1)
  }

  

  

//  0: 1
//  1: 3
//  2: 2 
//  3: 1
//  4: 4



  
  process.exit()
})


//Ÿ��Ÿ�� ���°� �׷��� ���� �ٸ� �����?