const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let N = +data.shift()

  let friend = data.map((i) => i.split(''))

  let result = []
  for (let i = 0; i < N; i++) {
    let count = 0
    for (let j = 0; j < N; j++) {
      if (friend[i][j] !== 'Y') continue

      count++ //�켱 �ڱⰡ ģ�����̴ϱ� ++����
      
      for (let k = 0; k < N; k++) { //���� Ž���� �ε���

        if (k === i) continue
        //���η� ���µ� �ڱ� �ڽ��� ���ؾ� �ϹǷ�
          
          
        if (friend[k][j] === 'Y') {
          //�ߺ� ����
          if (friend[k][i] === 'N') { //�̹� �ڱ� �ڽ��� �˰� ������ �ȵǹǷ�
            count++
          }
        }


      }
    }

    result.push(count)
  }

  console.log(Math.max(...result))
  process.exit()
})

//A�� B�� 2-ģ���� �Ǳ� ���ؼ���
//B�� A�� 2-ģ���� �Ǳ� ���ؼ���

//1. A B ���� ģ��
//OR
//2. A C ģ��, B Cģ�� > ���� ģ���� C�� ���� (ģ���� ģ��)

//�׷����� ���� �翬�� �ڱ��ڽų����� ģ���� �ƴϹǷ� ����� �밢����
//�� N�̰�
//A�� B�� ģ����, B�� A�� ģ���̹Ƿ� �׷����� ���� ��Ī�̴�

//����3
//A > B
//B > A , C
//C > B , D
//D > C , E
//E > D

// c�� bd�� �˰� 2
// a�� b�� �˰�  3
// e�� d�� �ȴ�  4

//���η� ���鼭 Y�� ������
//���Ʒ��� Y���� �� ī��Ʈ �ϸ� ��

//�ٵ� �̷��Ը� �ϸ� �ȵ�

//����1
//A > B , C
//B > A , C
//C > A , B

//A�� ģ�� B,C�� �ƴ� ����鵵 ������ �³׵鵵 �̹� A�� �˰�����
//�̷� �ߺ��� ������� ��

//�ٽ� ����3���� ����
//C�� ģ�� B,D�� �ƴ� ����� �ִ��� ���Ʒ��� ã��,
//�� ����� C�� �˰� ������ �ȵ�

//���η� ���鼭 Y�� ������
//���Ʒ��� Y���� �� ī��Ʈ �ϸ� ��
//�� �� ���Ʒ��� Y�� �ִ� ���� �ε��� �߿��� �ڱ� �ڽŰ� ģ���� ���� ����
