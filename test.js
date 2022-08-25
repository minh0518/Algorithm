const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  let table={
    a:1,
    b:2,
    c:3
  }

  for(let i in table){
    console.log(i,table[i])
    // a 1
    // b 2
    // c 3
  }
  process.exit()
})


//���� ū ���ڸ� ���ʿ� ���� ���ڸ� �����ʿ� ���� ���� �� ���Ѵ�

// V, L, D �ѹ���
//  I, X, C, M�� �����ؼ� �� ��������

//������ ���� ���� (������-���� �̴�)
// IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900
//�̵� ������ �� ������
//IV �� IX
//XL �� XC
//CD �� CM  �� ���� �� �� ������
//�� ������ �켱������ ���� ����