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
  let num=data.map(item=>item.split('').map(Number))


  let min=Math.min(N,M) //�� ���� ���� �� ����

  let result=[]
  //��ü ��� ��ȸ
  for(let i=0; i<N; i++){
    for(let j=0; j<M; j++){

      // Ư�� ��ǥ�� �������� �� ��N,M�� ���� ���� ������ ���ذ���
      // ���� ���ڰ� �ִ��� Ȯ���Ѵ�
      for(let k=0; k<min; k++){
        if(i+k<N && j+k<M){ //����� ���� �� �Ѿ���� Ȯ��
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

