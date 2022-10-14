const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {


  let INF = Infinity

  let N = 4
  let M = 7

  //'a b c' >> 'a���� b�������µ� �ɸ��� ���c'
  let edge = ['1 2 4', '2 1 3', '1 4 6', '2 3 7', '3 1 5', '3 4 4', '4 3 2']

  let graph = new Array(N + 1).fill().map(() => new Array(N + 1).fill(INF))

  //console.log(graph)

  //�ڱ��ڽ����� ���� ����� 0���� �ʱ�ȭ(�׷��� �밢��)
  //0��0���� �� ���� ���̹Ƿ� ����
  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      if (i === j) graph[i][j] = 0
    }
  }

  //console.log(graph)

  //�� ������ ������� ������Ʈ 
  for (let i = 0; i < M; i++) {
    let [a, b, c] = edge[i].split(' ').map(Number)

    graph[a][b] = c
  }
  
  console.log(graph)


  //�÷��̵� �ͼ� �˰��� ����(k��� ����)
  for(let k=1; k<N+1; k++){
    for(let a=1; a<N+1; a++){
      for(let b=1; b<N+1; b++){
        graph[a][b]=Math.min(graph[a][b],graph[a][k]+graph[k][b])
      }
    }
  }

  console.log(graph)

  

  process.exit()
})
