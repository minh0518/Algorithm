const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data=[];
let count=0;
let num1,num2,result;

rl.on('line', (input) => {
  data.push(input);
  count++;


     if(count==2){  //2���� �� �ް� ����

      num1=parseInt(data[0]);
      num2=parseInt(data[1]);
      result=parseInt(num1*num2);
		//�� ������ ������� �������� ���� �̸� ��� ��, �޾Ƶ�

      while(num2>0){
      console.log(num1*(num2%10))  //ù��° ���� �ι�° ���� 
													//������ �ڸ����� ���Ѵ�

      num2=parseInt(num2/10); // num2 �� ������ �ڸ����� �����Ѵ�.
	
													//10���� ���� ���� MathŬ������ �޼ҵ带 �����
                          //�Ҽ����� ���� ���� ������ �׳� Int�� ����ȯ�ؼ�
                          //���ݴ�
     }
     console.log(result);
       rl.close();
     }  
 });