const { count, time } = require('console')
const { off, mainModule } = require('process')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, M, V] = data.shift().split(' ').map(Number)

  let tmp = data.map((i) => i.split(' ').map(Number))

  //+1�� ����� �ϴ°� �� �������� ���Ǵ� ��ǥ�� 0���Ͱ� �ƴ϶�
  //1�����̹Ƿ� �ݵ�� +1�� ����� �Ѵ�
  let graph = new Array(N + 1).fill().map(() => [])
  for (let i = 0; i < tmp.length; i++) {
    graph[tmp[i][0]].push(tmp[i][1])
    graph[tmp[i][1]].push(tmp[i][0])
    //������̹Ƿ� �� �� ����� �Ѵ�
		//�⺻������ dfs,dfs�� ������̰�
		//�ߺ��̴��� �� �� ����� �Ѵ�
		//ex 1->2 , 2->1
  }

//�� �������� �湮�� �� �ִ� ������ ���� ���� ��쿡�� 
//���� ��ȣ�� ���� ���� ���� �湮�Ѵٰ� �����Ƿ� ������ ������Ѵ�
  graph = graph.map((i) => {
    return i.sort((a, b) => a - b)
  })
//[ [],[],[5,1]]  => //[ [],[],[1,5]]

  let dfsVisited = new Array(N + 1).fill(false)
  let bfsVisited = new Array(N + 1).fill(false)
  let dfsResult = []
  let bfsResult = []

  const dfs = (start) => {
    dfsVisited[start] = true
    dfsResult.push(start)

	//�Ϻη� for of�� ������� �ʰ� ������ �ε����� ����
    for (let i = 0; i < graph[start].length; i++) {
      if (!dfsVisited[graph[start][i]]) {
        dfs(graph[start][i])
      }
    }
  }

  const bfs = (start) => {
    let queue = []
    queue.push(start)
    bfsVisited[start] = true

    while (queue.length) {
      let v = queue.shift()
      bfsResult.push(v)
	//�Ϻη� for of�� ������� �ʰ� ������ �ε����� ����
      for (let i = 0; i < graph[v].length; i++) {
        if (!bfsVisited[graph[v][i]]) {
          queue.push(graph[v][i])
          bfsVisited[graph[v][i]] = true
        }
      }
    }
  }

  dfs(V)
  bfs(V)

  console.log(dfsResult.join(' '))
  console.log(bfsResult.join(' '))

  process.exit()
})