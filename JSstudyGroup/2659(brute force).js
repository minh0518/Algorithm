const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

const check = (num) => {
  let result = []
  for (let i = 0; i < num.length; i++) {
    let tmp = num.shift()
    num.push(tmp)

    //result.push(Number(num.push(tmp).join('')))
    //join�� �迭���ٰ� �ؾ��Ѵ�. 
		//������ push�� �迭�� ��ȯ���� �����Ƿ� �̷��� ���ÿ� ����ϸ� �� �ȴ�

    result.push(Number(num.join('')))
  }

  return Math.min(...result)
}

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let num = data.shift().split(' ').map(Number)

  let target = check(num)



  let compare=[]
  for (let i = 1111; i < 9999; i++) {
    

    if (('' + i).includes('0')) {
      continue
    }//0�� ����ī�忡 �� ��


    let tmp = check(('' + i).split('').map(Number))
    //check�Լ��� ���ڹ迭�� �鰡�Ƿ�, ���ڸ� �迭�� ����
    //(�ٵ� ���� �Լ��ȿ��� �ٲ��ִ� ���� �� ���ƺ��̱⵵ ��)
    
    if (tmp < target) { //�ð������ ���� ���

      //��� ���� �� �������� �ߺ��� �ð������ ������ ������
			//�ߺ� ����
      if(!compare.includes(tmp)){
        compare.push(tmp)
      }
      
      
    }
  }

  console.log(compare.length+1)
  //���°�� �ִ� ������ ��� ���̹Ƿ� �տ� �ִ� �͵� +1



  process.exit()
})