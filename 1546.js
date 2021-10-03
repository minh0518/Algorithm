const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data=[]
let score=[];
let max=0,sum=0;
rl.on('line', (input) => {
    data.push(input.split(' ').map(Number));
 });
rl.on('close',()=>{
    score=data[1]
    max=score[0];
  for(let i=0; i<score.length; i++){
    if(max<(score[i])){ // ���� ������ map(Number)�� ���ڷ� ��ȯ���� �ʾҴٸ�
                    //���⼭ ���ڰ��� ���ڿ��ν� ���ϹǷ� �������� ������ �߻��մϴ�.
        max=score[i];
    }

  }

  for(let i=0; i<score.length; i++){
      score[i]=(score[i]/max)*100;  
      sum+=score[i];
  }


 console.log(sum/data[0]);

  process.exit();
})


//���ڿ��̴��� ���� ������ �ϸ� �ڵ����� ���ڰ� �ȴ�

//map(Number) 


//�Է°�����  data=(input.split(' ').map(Number)); ��  
//data.push(input.split(' ').map(Number));�� ����


//������ ���� data�迭���ٰ� [10,20,30]�� �ִ� ���̹Ƿ� 
// [10,20,30]�� �Ǵ� ���̰�(�츮�� �ƴ� �Ϲ����� �迭)
//���ڴ� data�迭���ٰ� push�ؼ� �� �迭�� ��°�� ���Ƿ� [ [10,20,30] ]�� �˴ϴ�
// �ᱹ [10 ,20 ,30]�� ��°�� �ϳ��� ���Ұ� �Ǵ� ������

//ù��° ����� ������
//3 
//10 20 30 
// �� �ϸ� [3]�� ���ٰ� [10,20,30]���� ���� ��������ϴ�.

//�׷��� �ι�° ������� �ϸ�
//[ [3] , [10,20,30]] �� ������ score=data[1]; ����
//�迭�� [10,20,30]�� �Ѱ��ְ� �Ǿ
// score�� [10 ,20 ,30]�� �˴ϴ�. �������� �迭����.