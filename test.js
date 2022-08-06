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

    //�����˻� �� �ϳ� �����ٵ� �����¿�� ��� Ž���ϴٺ���
    //������ ���� ������ ����� ��찡 �ݵ�� �����ϹǷ� ������ ����� �մϴ�
      if(a<=-1 ||a>=N || b<=-1 || b>=M){
        return false
      }
    
      if(graph[a][b]==0){
        graph[a][b]=1
        dfs(a - 1, b); //��
        dfs(a + 1, b); //��
        dfs(a, b - 1); //��
        dfs(a, b + 1); //��
        return true
      }
      else{
        return false
      }
    }
  
    
     let [N, M] = data.shift().split(' ').map(Number) //N�� rols , M�� cols
     let graph = []
  
     graph = data.map((item) => {
        return item.split('').map(Number)
     })
  
  
     result=0
  //3x3�̸� N,M�� 3�� ��.
  //���� �迭�ε����� 3�� �̹Ƿ� [0]~[2]
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
