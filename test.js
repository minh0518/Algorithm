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
    let N=data
    let X=data[1].split(' ')  // ���谡���� �ϳ��� �迭���ٰ� ����
    X=X.map(Number)     // �迭�� ������ ���ڿ����� ���ڷ� ����
    X.sort((a,b)=>a-b)  // �������� ����

    let count=0         // ���� �׷� �ȿ� ���Ե� �ο� ��
    let group=0         // �Ἲ�� �׷��� ��
    for(let i of X){
      count++
      console.log(`i : ${i}`)
      if(i==count){     //������ �������� �׷���� �ο��� ���϶��
        count=0
        group++
      }

    }

    console.log(group)

    process.exit();
})
// 1 2 2 2 2 3 3 4 
