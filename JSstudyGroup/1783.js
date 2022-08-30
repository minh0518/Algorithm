const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  
  let [N,M]=data.shift().split(' ').map(Number)

  let result=[]
  if(N===1){
    result.push(1)
  }
  else if(N===2){
    result.push(Math.min(parseInt((M+1)/2),4))
  }
  else if(N>2){
    if(M>=7){
      result.push(M-2)
    }
    else if(M===6 || M===5){
      result.push(4)
    }
    else if(M<=4){
      result.push(Math.min(M,4))
    }
  }

  console.log(result.shift())


  
  process.exit()
})


//ó�� �ִ� �ڸ��� �����̴ϱ�
//�̵�Ƚ���� 3������
//�湮�� ĭ�� 4������


//7ĭ�̸� 1ĭ������ 4���� ��
//�׷��ٸ� �ٸ� �ɼ� �� ����ϸ� 5������ ����

//�ٸ� �ɼ� �� ����� �� �ִ� �ּҰ� 7ĭ����


