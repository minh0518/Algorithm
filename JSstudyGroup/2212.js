const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  data.shift()

  let K=+data.shift()

  let sensor=data.shift().split(' ').map(Number)
  sensor=sensor.sort((a,b)=>a-b)

  let distance=[]
  for(let i=0; i<sensor.length-1; i++){
    distance.push(sensor[i+1]-sensor[i])
  }

  // distance=(distance.sort((a,b)=>a-b)).slice(0,distance.length-(K-1))
  // let result=distance.reduce((a,b)=>a+b,0)
  //�ݵ�� reduce���� ���⼭ �ʱⰪ 0�� ��������� ��Ÿ�� ������ �߻����� ����

  let arr=distance.sort((a,b)=>a-b)
  let result=0
  for(let i=0; i<distance.length-(K-1); i++){
    result+=arr[i]
  }

  console.log(result)
  
  process.exit()
})

//  3,    6,    7,    8,  10  ,  12 ,  14 ,   15  ,  18 ,  20   
//    3      1     1     2    2      2     1     3       2  
//���⼭ 4���� ���

//          1     1     2    2           1