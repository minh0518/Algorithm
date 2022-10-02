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

  let target = data.shift().split(' ').map(Number)

  let graph = new Array(N + 1).fill().map(() => [])

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (j + bridge[i] <= N) {
        graph[i + 1].push(j + bridge[i])

        if (bridge[i] !== 1) {
          //�ش� �ε����� ������� ���
          j += bridge[i] - 1 //j++�� ���ִ� �� ������ -1�������
        }
      }
    }
  }

  console.log(graph)

  //[1]�� 2,3,4,5��°�� �̵�����
  //[2]�� 4��°�� �̵�����

  const bfs = (node, end) => {
    let visited = new Array(N + 1).fill(false)

    let queue = []
    queue.push([node, 1])
    visited[node] = true

    while (queue.length) {
      let [v, depth] = queue.shift()

      for (let i of graph[v]) {
        if (graph[v].includes(end)) {
          return depth
        } else {
          if (!visited[i]) {
            queue.push([i, depth + 1])
            visited[i] = true
          }
        }
      }
    }
  }

  let result = bfs(target[0], target[1])
  if (result === undefined) {
    console.log(-1)
  } else {
    console.log(result)
  }

  process.exit()
})

// [
//   []
//   1��° ¡�˴ٸ��� �ε���(1,2,3,4)�� ¡�˴ٸ��� �̵�����
//   1 [1,2,3,4]
//   2 [3]
//   3 [4]
//   4 [4]
//   []
// ]

//�ɺ����� ����ó�� �̷��� Ÿ��Ÿ��
//2 3 2 1 2 8 5
//2 7

//[ [], [ 3, 5, 7 ], [ 5 ], [ 5, 7 ], [ 5, 6, 7 ], [ 7 ], [], [] ]
// 7
// 2 3 2 1 2 8 5
// 2 7