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
  //M�� ���� ����  , N�� ���� ����
  //��ǥ�� ����,���� (��,�� ������ �ƴ�..�� �ƴ϶� �´°Ű�����?)
  //��ǥ�� 0���� ����

  let T = data.shift()
  let [M, N, K] = []
  let graph = []

  const DFS = (x, y) => {
    if (x >= 0 && x < M && y >= 0 && y < N) {
      if (graph[x][y] === 1) {
        graph[x][y] = 0
        DFS(x + 1, y) //�Ʒ�
        DFS(x, y + 1) //������
        DFS(x - 1, y) //��
        DFS(x, y - 1) //����
      } else {
        //��� �Լ� ��������
        return
      }
    }
  }

  for (let i = 0; i < T; i++) {
    [M, N, K] = data.shift().split(' ').map(Number)

    let location = []
    for (let i = 0; i < K; i++) {
      location.push(data.shift().split(' ').map(Number))
    }

    graph = new Array(M) 
    for (let i = 0; i < M; i++) {
      graph[i] = new Array(N).fill(0)
    }//�̷��� �ϸ� ����(=��)�� ���̴� M�̰� ������ ����(=��)�� N�� ��
    //N���� ���̸� ���� �迭���� M���� �Ǵ� ��
    //�̰� Ȯ���ϰ� �������� ���� ���ΰ� M�̰� ���ΰ� N�̶�� �Ͱ� Ʋ����

    for (let i = 0; i < K; i++) {
      graph[location[i][0]][location[i][1]] = 1
    }

    let count = 0
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        if (graph[i][j] === 1) {
          DFS(i, j)

          count++
        }
      }
    }

    console.log(count)
  }

  process.exit()
})
