const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, W, L] = data.shift().split(' ').map(Number)

  let weights = data.shift().split(' ').map(Number)

  let count = 0
  let queue = new Array(W).fill(0)

  while (queue.length) {
    queue.shift()
    count++

    let currentTruck = weights[0]
    if (weights.length) {
      if (queue.reduce((a, b) => a + b, 0) + currentTruck > L) {//�� ��
        queue.push(0) //ť�� ���ʿ��� ����
      } else {
        queue.push(currentTruck) //ť�� �����ʿ� �߰�
        weights.shift()
      }
    }
  }

  console.log(count)

  process.exit()
})

//�ٸ����� �ѹ��� �ִ� w���� Ʈ���� �ö� �� ����
//�ٸ��� �ǳʷ��� �ٸ����� w�� �̵��ؾ� ��
//�ִ����� L

//���������� �� �Ѿ �ð����� üũ�ؾ� ��