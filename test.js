const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data;
let max=0;
rl.on('line', (input) => {
    data=input.toUpperCase();
 });
rl.on('close',()=>{
   let count=new Array(26).fill(0);

   console.log(data);
   for(let i=0; i<data.length; i++){
     count[((data[i].charCodeAt())-65)]++;
   }

  for(let i=0; i<count.length; i++){
     
    console.log(count[i]);
      
  }

  
//65���� 90
  process.exit();
})


//�������� �ʱ��ߴٽ���  data=input �̷��Ը� �޾Ƶ� �ڵ�����
//�Է°��� ���ڿ��� ���´�.



// data=input; �� �Է¹����� aaabc�� �Է¹޾����� (���ڿ�)

// data=inupt.split(" "); ���� �Է¹����� ['aaabc']�� �ȴ�.




//�ص��� �ΰ��� �����̴�.
//���ڿ��� []�� ������ �����ϴ�
//�̰� ���ڿ��� �迭�̶���� ��ü����� �̷��� �ƴ϶� (���ڿ��� ������Ƽ���̴�)
//�׸��� JS���� ���ڿ��� ��ü�� �ƴ϶�
//Javascript���� ���ڿ��� Array Like ���·� ������ �� �ֱ� �����̴�.


//�׸��� String��ü (�̰� ���ð��̶� �ٸ� ��¥ �� �״�� new String ��ü)
//�� �޼ҵ峪 ������Ƽ (touppercase�� indexof���� �͵�)��  ="" ����
//���ڿ� ���ͷ��� ������ ���ð��� ����� �� �ִ� ���� 
//�޼ҵ峪 ������Ƽ�� ����ϴ� ���� ���۰�ü�� �Ͻ������� ������ �Ǿ
//������ �� �ְ� ������ �ǰ� �� ������ ���۰�ü�� ������� �����̴�.


//new String �� String�� �ٸ���
//���ڴ� �����ڸ� ����� '��ü ����'�̰� ���ڴ� ���� ����ȯ�� ��ɸ� �����Ѵ�
//�׸��� JSƩ�丮�󿡴� new String�̶�� �� ��ü�� �Ⱦ���
//�ֳ��ϸ� �����ϸ� JS���� ���ڿ� ���ͷ��� ���� ���ð����� string�� ����ص�
//�� new String�� �����ϴ� �޼ҵ峪 ������Ƽ�� �� ����� �� �ֱ� �����̴�.
//�ٸ� ������ ��ǿ� ���۰�ü �ʱ��� ���� ����.


//    alert(?typeof?'hello'?);? // String
//alert(?typeof?new?String('hello')?);? //Object




//java���� ���ڿ���ü�� �� ��ü�� �Ǵ� ������ ����� �򰥸�����
//(��� java������ ���ڿ� ���ͷ��� new String�� ���� ����Ǵ� �ּҰ���
//�ٸ��� �մϴ�)
//jS���� �и��� �ٸ��ϴ�.