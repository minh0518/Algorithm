const { off } = require('process')
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
   
   let N=+data.shift()

   let DP=new Array(N).fill().map(()=>new Array(10).fill(0))
   //�� ���� ������ ����
   //�� ���� �ش� ���̿��� �� ���ڷ� �����ϴ� ���
   

   DP[0].forEach((value,index)=>{
      DP[0][index]=1
   })

   

   for(let i=1; i<DP.length; i++){
      for(let j=0; j<10; j++){
         for(let k=0; k<=j; k++){
            DP[i][j]+=DP[i-1][k]//��ȭ��
            DP[i][j]%=10007
         }
         
      }
   }
   
   
   //console.log(DP)
	console.log(DP[N-1].reduce((a,b)=>a+b)%10007)
  

   
  process.exit()
})