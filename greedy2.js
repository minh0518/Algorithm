const { off } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
})
const data = []

rl.on('line', (input) => {
   data.push(input) // 26 7  �Է�
}).on('close', () => {
   let count = 0
   let target
   let [n, k] = data.shift().split(' ').map(Number)

   while (1) {
      if (n < k) { //���̻� ���� �ʿ� ���� ���⸸ �ϸ� 
									//�Ǵ� ��Ȳ�̹Ƿ� break
         break
      }

      target = parseInt(n / k) * k

      count += n - target

      n = target

      n = parseInt(n / k)

      count++
   }

   count += n - 1

   console.log(count)

   process.exit()
})


// ��� �� N�� 1�� �� ������ ������ �� ���� �� �ϳ��� �ݺ������� �����ؾ� �մϴ�
// �� , N�� K�� ����� ������ ���� ������ �� �ֽ��ϴ�
// 1. N���� 1�� ���ϴ�
// 2. N���� K�� �����ϴ�

// ������� N�� 17 K�� 4 ��� �����սô�. �̶� 1�� ������ �����ϸ� N�� 16�� �˴ϴ�
// ���Ŀ� 2�� ������ 2�� �����ϸ� N�� 1�� �˴ϴ�.
// �� ��� ��ü������ ������ Ƚ���� 3�� �˴ϴ�. �̴� N�� 1�� ����� �ּ� Ƚ���Դϴ�


// N�� K�� �־��� ��, N�� 1�� �� ������ 1�� Ȥ�� 2�� ������ �����ؾ� �ϴ� �ּ� Ƚ����
// ���ϴ� ���α׷��� �ۼ��ϼ���