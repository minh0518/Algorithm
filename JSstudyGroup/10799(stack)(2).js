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
 
  let text=data.shift().split('')

  let stack=[]

  let result=0


  for(let i=0; i<text.length; i++){
    if(text[i]==='('){

      if(text[i+1]===')'){
        result+=stack.length
        i++ //�Ʒ� continue�� �Ǹ� �ش� ������ ������ �ٷ� ���� ������
            //�Ѿ�µ� �� �������� (for���� 3��° ����)i++�� �ѹ��� �ǹǷ�
            //+2�� �ƴ϶� +1�� �ؾ� �Ѵ�
        continue
      }
      else{
        result++
        stack.push('(')
      }
    }

    else{ //')'�϶�
      stack.pop()
    }

  }

  console.log(result)
  
  process.exit()
})

//�⺻ ( ������ �Ǹ� ������ + , �׸��� ���ÿ� ������ ��� ��
// ()�� ©���� ������ ���� +
// )�� ������ ���ÿ��� -1 (���� �������� -1�� �ƴ�)