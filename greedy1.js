const { off } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const data=[]

rl.on('line', (input) => {
    data.push(input)    //1260 �Է�
 }).on('close',()=>{ 
    let N=Number(data[0])
  
    let count=0

    let arr=[500,100,50,10]

    for(let coin of arr){
      count+=parseInt(N/coin)
      N%=coin
    }

    console.log(count)
        

	process.exit();
})

// ����� �������� �����Դϴ� ī���Ϳ��� 500 , 100 , 50 , 10 ��¥�� ������ ������ �����ϰ�
// �մԿ��� �Ž��� �־�� �� ���� N���� �� �Ž��� �־�� �� ������ �ּ� ������ ���Ͽ��� 



