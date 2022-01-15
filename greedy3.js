const { off } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const data=[]

rl.on('line', (input) => {
    data.push(input)  
 }).on('close',()=>{

  let result=Number((data[0])[0])  
//ù��° �� ������

  let num=data[0] //��ü ���ڸ� ���ڿ��� ������
  for(let i=1; i<data[0].length; i++){
    if((Number(num[i])<=1 || result<=1 )){ 
        result+=Number(num[i])
    }
    else{
      result*=Number(num[i])
    }
  }
  console.log(result)
  
    process.exit();
})


// �� �ڸ� ����(0~9)�θ� �̷��� ���ڿ� s�� �־����� ��,
// ���ʺ��� ���������� �ϳ��� ��� ���ڸ� Ȯ���ϸ鼭 ���� ���̿� * Ȥ�� + ��������
// �־ ��������� ������� �� �ִ� ���� ū ���� ���ϴ� ���α׷��� �ۼ��ض�.
// ��, + ���� * �� ���� ����ϴ� �Ϲ����� ��İ��� �޸�, ��� ������ ���ʿ�������
// ������� �̷�����.

// ������� 02984��� ���ڿ��� ���� �� �ִ� ���� ū ���� 
// ((((0+2)*9)*8)*4) = 576  �Դϴ�.
// ���� ������� �� �ִ� ���� ū �Լ��� �׻� 20�� ������ ������ �ǵ��� �Է���
// �־����ϴ�(��� ����� �⺻ int���� �� 21����� ǥ���� �����ϹǷ�)