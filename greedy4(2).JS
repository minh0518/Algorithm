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
    let N=data[0]
    let X=data[1].split(' ')  
    X=X.map(Number)     
    X.sort((a,b)=>a-b)  

    let count=0         
    let group=0        
    for(let i of X){
      count++
      if(i==count){     // ������������ ������ �����Ƿ�
                        //�������� �������� �׷���� �ο��� ���ϡ���� ���� ������ ���� ����
                        //������ �������� �׷���� �ο����� ������ ���� �־
                    // �������� �׷���� �ο������� ���� ���� ���� ���� ���̴�.
        count=0
        group++
      }

    }

    console.log(group)

    process.exit();
})