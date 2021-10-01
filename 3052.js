const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data=[]
let result=[];
let num;

rl.on('line', (input) => {
    data.push(input);
 });
rl.on('close',()=>{
  
    for(let i=0; i<data.length; i++){
        num=data[i]%42;
        if(result.indexOf(num) == -1){
          result.push(num);
        }
    }
    
    console.log(result.length);

  process.exit();
})


// indexOf �޼ҵ�� �μ��� �־��� ���� �ش� �迭�� ������ ù������ �߰��� �ε���( 1, 0 , 1 �� ������ 1�� �˻��ҽ�, [0] �� �߰� [2]�� ���� �ʽ��ϴ�)
// ���� ��� -1�� �����մϴ�.
// ���⼭�� �켱 �Է°����� data���ٰ� �� �޾Ƴ���
// �ϳ��� %42�� �� ���� ���� ���� ������  ���ο� �迭 result�� indexOf�� �˻��� ���ϴ�
// ���� result�� %42�� ���� ���ٸ� �ٷ� result�� ����ְ� �˴ϴ�.
// ó�� �Էµ� ������ �翬�� result�迭�� �Ȱ��� �迭�� �����Ƿ� �ٷ� ��������

// ���߿� %42�� ���� result�� �̹� �ִ� ���̶�� ���� �ʽ��ϴ�.
// �� ������ ������ �������� result�迭�� ���̸� ����մϴ�
// result�迭���� �ߺ��Ǵ� ���� ���ŵ� ���鸸 �����ϱ� �����Դϴ�.
