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
    //��������

  let N=data.shift()
  let K=data.shift().split(' ').map(Number)

  let D=new Array(100).fill(0) //D�� �ش� �ε������� �о��� ��
                          //���� ������ ��(=����)���� ��� ����

  D[0]=K[0]
  D[1]=Math.max(K[0],K[1])

  for(let i=2; i<N; i++){
    D[i]+=Math.max(D[i-1],D[i-2]+K[i])
  }

  console.log(D[N-1])

  console.log(D)  
  process.exit()
})

