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

  let time = data.map((i) => i.split(' ').map(Number))

  time = time.sort((a, b) => {
    return b[1]-a[1]
  })


  let current=time[0][1]-time[0][0]
  for(let i=1; i<N; i++){
      if(current<time[i][1]){
        time[i][1]=current
        current=time[i][1]-time[i][0]
      }
      else{
        current=time[i][1]-time[i][0]
      }
  }

  if(current<0){
    console.log(-1)
  }
  else{
    console.log(current)
  }
  


  process.exit()
})


//[ [ 5, 20 ], [ 1, 16 ], [ 8, 14 ], [ 3, 5 ] ]


// 20�ÿ��� 5�ð��ϸ� 15��

// 16�ñ��� �ؾ������� ���ܼ�
//( 16�ñ��� �����⸸ �ϸ� �Ǵ� �Ŷ� 15�ñ��� ������ ����
//�̷��� �ϴ� ������ �������� �������� �ִ��� ���ܾ� ������ ���� �� ����)

// 15�ÿ��� 1�ð��ϸ� 14��
//�����ϹǷ� �״�� ����

// 14�ÿ��� 8�ð����� 6��
//�׷����� ������ �ð��� ������� ������ ���� ���� �����Ƿ�
//�״�� ����

// 2�ÿ� ����


// >> 

// �� �ð� < �����ð� (�� �ð��� �� �����϶�)
// �� �ð�=�����ð�

// �� �ð� >=�����ð� 
// �����ð��� �״��






// ����ð� > ���� �۾� ���۽ð�
// �����۾� ���۽ð�-�����۾� �ҿ�ð�

// ����ð� <= ���� �۾� ���۽ð�
// ����ð�-�����۾� �ҿ�ð�