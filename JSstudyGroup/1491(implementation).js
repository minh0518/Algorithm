

//�� ������ ���� ���ؿ��� �޸� �ʰ��� �߻� ��ŵ�ϴ�.
//�׷��Ƿ� �ٸ� ������ �ʿ������� �켱 ������ü�� ����� ����� �Ǳ⿡
//�迭 ��ǥ �н������� �켱 ����� �ξ����ϴ�


const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  //���⼭ N�� �� , M�� ��
  let [N, M] = data
    .shift()
    .split(' ')
    .map((item) => +item) //map(Number)

  //��� �������� ġ�� (M,N)
  //�������� ����ϴ� ��ǥ�� (N,M)
  //��İ������� �� ������ �������� ��ǥ�� �ڹٲ��൵ �ȴ�
  //�߿��� ���� ���ʾƷ��� 0,0�̶�� ���ε� �̰͵� ���� ��İ������� �ϰ�
  //�������� ��ǥ�� ���� �� ����
  let floor = new Array(M)
  for (let i = 0; i < M; i++) {
    floor[i] = new Array(N).fill(0)
  }

  //�̰͵� �ķ�. ���� ��İ��������ϰ� �������� ��ǥ�� �ڹٲ���
  let direction = [
    //������� �� �� �� ��
    [0, -1, 0, 1],
    [1, 0, -1, 0],
  ]

  let [x, y] = [M - 1, 0] // �࿭����. ���̰� M�̸� ��ǥ�� M-1���ؾ���
  let [dx, dy] = [x, y]
  let visited = []

  let count = 0
  let i = 0
  floor[x][y]=1  //�ݵ�� ���������� �湮ó���� �ؾ� �Ѵ�
  while (count !== (N*M)-1) {
   // console.log(`i=${i}`)
    dx = x + direction[0][i % 4]
    dy = y + direction[1][i % 4]
//���� ��ǥ���� ���ؾ� �Ѵ�. dx+=direction[0][i % 4] �� ���� �ȵȴ�

    //console.log(`dx : ${dx}, dy : ${dy}`)

    //�̰� ������ ����
    if (dx < 0 || dy < 0 || dx > M || dy > N) { 
								//�ݵ�� 0���� Ŀ�� �ϴ� �͵� ����ؾ� �Ѵ�
    //  console.log('���� �ʰ�')
      i++
      continue
    } else {
      if (floor[dx][dy] === 0) {
        x = dx
        y = dy
        visited.push([x, y])
        floor[x][y] = 1 //�湮ó��
        count++
      //  console.log('count++')
      } else {
       // console.log('�湮�߾���')
        i++
        continue
      }
    }
  }

  // console.log(visited)
  // console.log(count)
   console.log(floor)


  x=(M-1)-x
  console.log(y,x)
  process.exit()
})


//r�� ã�´� ĥ��
//r > 1,2 (��������)
//  > 2,2 (���� �����ǥ) 

//t�� ã�´� ĥ��
//t > 1,4 (��������)
//  > 2,4 (���� �����ǥ) 

//�����غ��� ������ ����ó�� ����ǥ�� �Ȱ��� �ุ �ٸ���
//�׷��� ��߼��� ���ʾƷ���ǥ�� �ְ�
//�� ���� ������ �������� �� ��ǥ�� %�� ��ȯ���� ������
//�� �� ��ǥ�� �ٲ㼭 ����غ���