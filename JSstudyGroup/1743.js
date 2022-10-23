const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, M, K] = data.shift().split(' ').map(Number)

  let cord = data.map((i) => i.split(' ').map(Number))

  let map = new Array(N).fill().map(() => new Array(M).fill(0))

  //�׷��� ����
  cord.map((i) => {
    let [x, y] = i
    map[x - 1][y - 1] = 1 //�迭��ǥ�ϱ�
  })

  let visited = new Array(N).fill().map(() => new Array(M).fill(false))

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ]

  const dfs = (x, y) => {
    let result = 1

    visited[x][y] = true

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i]
      let ny = y + dy[i]

      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        if (map[nx][ny] === 1 && !visited[nx][ny]) {
          result += dfs(nx, ny)
        }
      }
    }

    return result
  }

  let answer=[]
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 1 && !visited[i][j]) {
        answer.push(dfs(i, j))
      }
    }
  }

  console.log(Math.max(...answer))
  

  process.exit()
})

//������ dfs�� bfs���� �湮�� ������ ���������� ��� �����ߴ���?
//���߹��������� count��� ��������?

//dfs����ϴ� if�� �Ʒ����ٰ� else�� �����ϸ� �ȵ� ������ for���� �ִµ� ��

//�̰� +�ϸ鼭 ����ȵȴ�
//���ն�ó�� +�ϴ°� �ܺο� ���������� ��� �߰��� �ϴ°Ű�
//������ ���������� ������ �޾ƾ� �ϴ� ���̴�