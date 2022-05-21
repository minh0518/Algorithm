const { time } = require('console')
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

  let [N,S,M]=data.shift().split(' ').map(Number)
  
  let V=data.shift().split(' ').map(Number)

  let DP=new Array(N+1).fill().map(()=>new Array(M+1).fill(false))
  DP[0][S] = true

  for(let i=1; i<N+1; i++){

    let tmp=[]

    for(let j=0; j<M+1; j++){
      if(DP[i-1][j]===true){
        tmp.push(j)
      }
    }

    for(let j=0; j<tmp.length; j++){
      if(tmp[j]+V[i-1]<=M){
        DP[i][tmp[j]+V[i-1]]=true
      }
      if(tmp[j]-V[i-1]>=0){
        DP[i][tmp[j]-V[i-1]]=true
      }
      
      
      //������ �߰��� ���� ����� ���̻� true�� �ٲ��� �ʴ� ���̰�
      //�״�� ������ ����

      //�߰��� ������ ���� �ʴ´ٸ� ������ �̰����� �ϴ� ���� �� �����ϴ�
      //���� �Լ����� ���鼭 return������ ����ϰ� ���� �ʴ�
    }
    
  }
  
  let result=[]
  for(let i=0; i<M+1; i++){
    if(DP[N][i]!==true){
      continue
    }
      result.push(i)
    
  }
  

  if(result.length){
    console.log(Math.max(...result))
  }
  else{
    console.log(-1)
  }
  


  process.exit()
})

// [
//   [False, False, False, False, False, True, False, False, False, False, False], 
//   [False, False, False, False, False, False, False, False, False, False, False], 
//   [False, False, False, False, False, False, False, False, False, False, False], 
//   [False, False, False, False, False, False, False, False, False, False, False]
// ]

