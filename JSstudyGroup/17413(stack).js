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
  let S = data.shift().split('')

  let stack=[]
  let isTag=false //�ݵ�� ó���� false�� �ؾ���
                    //�׷��� ������ �Ʒ� ������ 
                    //�Ϲ� ���ڿ��� �����ϴ� �Է��� �־��� ���, 
                    //�±� �ȿ� �ִ� �������� �ν��� �Ǿ 
                    //���ÿ� ���� pop�Ǵ� ������ ������� �����Ƿ�
                    //���ڿ������� �� ��
  let result=[]

  for (let i of S) {
    if(i==='<'){
      isTag=true

      while(stack.length){ //�±� ������ �ִ� ���ڿ����� ������ �˴� ���
        result.push(stack.pop())
      }
      result.push(i) // '<'�� ���

    }
    else if(i==='>'){ 
      isTag=false
      result.push(i)  // '>'�� ���
    }
    else if(isTag){  //�±� �ȿ� �ִ� ������̸� �״�� ���
      result.push(i)
    }

    else{ //�±� �ȿ� �ִ� ���� �ƴ� �Ϲ� ���ڿ���

      if(i===' '){  //�����̸�
        while(stack.length){  //���� ������ �ִ� �͵� ��� ���
          result.push(stack.pop())
        }
        result.push(i) //������ ���
      }
      else{  //������ �ƴ� ���ڿ��̸�
        stack.push(i)
      }

    }
  }

  //����� �±׸� �����ų�, ������ ������ ��쿡�� �ƾ���
  //�Ϲ� ���ڿ��� ��� ����ؼ� ���ÿ� push�� �� �־��� (��¿��� result�� push�� �ƴ�)
  //�׷��Ƿ� �±װ� ���� ������ ���ڿ��� ���� ��쿡 ������ ���ڿ����� ����Ѵ�
  while(stack.length){  
    result.push(stack.pop())
  }


  console.log(result.join(''))

  


  process.exit()
})

