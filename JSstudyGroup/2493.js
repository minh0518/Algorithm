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

  let towers=data.shift().split(' ').map(Number)

  let stack=[]

  let answer=[]

  for(let i=0; i<N; i++){
    const currentTower = {
      index: i + 1,
      height: towers[i]
    }


    if(!stack.length){ //������ �� ���� �տ� ž�� �ϳ��� ���� ���̹Ƿ�
                      //���ÿ� ���� ž�� push�ϰ� �������� 0�� push
      stack.push(currentTower)
      answer.push(0)
      continue
    }

    if(stack[stack.length-1].height<currentTower.height){
        //������ �� ���� �ִ�(=���� ž�� ���� �������� �ִ� ž)ž�� ���̺���
        //���� ž�� �� ���ٸ� ��������ȣ�� �������� ���Ѵ�
        //�׷��Ƿ� stack�� ���鼭 ã�ƺ����Ѵ�

      while(stack.length){ //������ �� ������
        if(stack[stack.length-1].height>=currentTower.height){ 
                                    //stack�� ���鼭
                                    //���� �Է¹��� Ÿ���� ���̺��� ū Ÿ���� ã�´�
          break //ã���� �ٷ�break ��, ���̻� ���ÿ��� Ž������ ����
        }
        else{
          stack.pop() //����ؼ� ������ Ž����
                    //���⼭ ���� ž���� ���� ���� ������ �������� ���ŵ��� �����Ƿ�
                    //�ƿ� ���ÿ��� ������Ų��
        }
      }

      //while���� Ż���ߴٸ� stack�� �� ������ �� ���Ұų�, 
      //�߰��� ���� Ÿ������ ū ���� ã�Ҵٴ� ���̴�
      if(!stack.length){ //stack�� �� ������ �� ������ ���
        answer.push(0) //�������� 0 push
      }
      else{ //�߰��� ���� Ÿ������ ū ���� ã���� ���
        answer.push(stack[stack.length - 1].index)
        //�������� ���ÿ��� ã�� Ÿ���� �� push
      }

      stack.push(currentTower)
      //���� Ÿ���� ���ÿ� push
    }

    else{ //������ �� ���� �ִ�(=���� ž�� ���� �������� �ִ� ž)
          //ž�� ���̰� ���� ž���� �� ���ٸ� �װ� �ٷ� ������ �ǹǷ�
      answer.push(stack[stack.length - 1].index)
      stack.push(currentTower)
      //�׸��� ���ÿ� ���� ž push
    }
  }



  console.log(answer.join(' '))
  

  
  process.exit()
})

