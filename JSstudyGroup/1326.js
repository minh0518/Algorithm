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

  let bridge = data.shift().split(' ').map(Number)

  let [start, end] = data.shift().split(' ').map(Number)

  const bfs = (start, end) => {

    let queue = []
    queue.push(start - 1) //(�ε��� ������) ���۳���� ��ġ�� ����

    let check = new Array(N).fill(-1) 
		//�� ¡�˴ٸ������� �̵��ؾ� �ϴ� Ƚ�� ���

    check[start - 1] = 0 //ó�� �湮�ϸ� 0����

    while (queue.length) {
      //���⼭���ʹ� �� �ε��� ����

      let node = queue.shift() //��� �ε����� ����

      for (let i = node; i < N; i++) {
        //�ش� ������ ������ ���°� ���
        if ((i - node) % bridge[node] !== 0) continue //���������� �ش� �����ŭ ����

        if (check[i] === -1) {//��ü bfs�������� ���� ���� ���� ¡�˴ٸ����

          queue.push(i) //ť�� �־��ְ�(=������ �湮�� ¡�˴ٸ� �ε���)
          check[i] = check[node] + 1 //���� ¡�˴ٸ��κ��� �� ���̹Ƿ�
          //�� ������ ���������� check[node]������ 1�� ������ ���� �־���



          //�̰� ������� �ʴ� ���̸� ���� ¡�˴ٸ� ����δ� ��������
          //�������� ���ϴ� ��
          //�׷��Ƿ� ���� while������ queue���� ���ο� ���� ������
          //�ٽ� �����ؾ� ��
          if (i === end - 1) {
            //i�� ���������� ��� �Ǵ� ���� ¡�˴ٸ� ��ġ�ε�
            //�̰� ������������ ���� ��
            return check[i]
          }
        }
      }

			//������̹Ƿ� �ڷ� ���� ��쵵 ����
			//i�� �������� ���� �� �����ϰ� �������� �Ȱ���
      for (let i = node; i > -1; i--) {
        if ((i - node) % bridge[node] !== 0) continue

        if (check[i] === -1) {
          queue.push(i)
          check[i] = check[node] + 1
          if (i === end - 1) {
            return check[i]
          }
        }
      }

    }
    return -1
  }

  console.log(bfs(start, end))

  process.exit()
})

// for (let i = 3; i < 20; i++) {
//   if ((i - 3) % 4 !== 0) continue
//   console.log(i)

//   // 3 ���� ���� , 4�� ���
//   // 3  7 11 15
// }