const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


let original,num,one,result=0;
let count=0;

rl.on('line', (input) => {

  original=input;
    
 });
rl.on('close',()=>{
  if(original<10){
    original*=10;
  }
  if(original==0){
    console.log(1);

  process.exit();
  }

   while(original!=result){

     if(count==0){
    result=original; 
    //ó�� ������ �� ������ ������ ���� ������ �ϴϱ� �����Ҷ��� 
    //result���� �Ѱ��ش�
     }

  one=((result%10)+(parseInt(result/10)))%10
  //���ο� ���� ���鶧 ���Ǵ� �ι�° �ڸ���
  //68�� ��� 6+8�� 14�̹Ƿ� 4�� �����;� �ϹǷ� �������� %10 ���

  result=parseInt((result%10)+''+(one))
  //���ο� �� ����. ù��° �ڸ����� �ٷ� ����ؼ� �ۼ�
  
  

  count++;
  
  }
  
console.log(count);

  process.exit();
})


