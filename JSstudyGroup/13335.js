const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, W, L] = data.shift().split(' ').map(Number);

  let trucks = data.shift().split(' ').map(Number);
  //�ٸ����� �ǳ��� ���� ������� Ʈ����

  let count = 0;
  let bridge = new Array(W).fill(0);

  while (bridge.length) {
    bridge.shift();
    count += 1;

    if (trucks.length) {

      // ���� Ʈ���� �ִ� ��쿡�� ����
      // ���� Ʈ���� ������ bridge�� ������ ������ count+=1�� ����
      // (=�ٸ� ���� �ִ� ������ Ʈ���� ���� �ǳζ����� count)

      let currentTruck = trucks[0];
      let currentWeightOnBridge = bridge.reduce((a, b) => a + b, 0);

      if (currentWeightOnBridge + currentTruck > L) { // �ٸ� ���߶����� �� ��
        bridge.push(0); // ť�� ���ʿ��� ����
      } else {
        bridge.push(currentTruck); // ť�� �����ʿ� �߰�
        trucks.shift(); // �ٸ��� �ǳʱ� ������ Ʈ���� trucks���� ����
      }
    }
  }

  console.log(count);

  process.exit();
});

//�ٸ����� �ѹ��� �ִ� w���� Ʈ���� �ö� �� ����
//�ٸ��� �ǳʷ��� �ٸ����� w�� �̵��ؾ� ��
//�ִ����� L

//���������� �� �Ѿ �ð����� üũ�ؾ� ��
