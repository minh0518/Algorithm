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
  let T = data.shift()
  let [M, N, K] = []
  let graph = []


  //�����¿� ���鼭 1�̸� ť�� push�� �ϰ� �湮ó���� 0���� ���ִ� ��
  const BFS = (x, y) => {
    let queue=[]
    let dx,dy
    let direction=[[-1, 0], [1, 0], [0, -1], [0, 1]] //�����¿�


    queue.push([x,y])

    while(queue.length){ //������ ���� ���鼭 0���� ����� ��� ��
      let [getX,getY]=queue.shift() 
      
      if(graph[getX][getY]===0){
        continue;
      }

      graph[getX][getY]=0 //�̰� �� �߿�. �湮ó�� ����
      
      for(let i=0; i<direction.length; i++){
        dx=getX+direction[i][0]
        dy=getY+direction[i][1]

        if((dx >= 0 && dx < M && dy >= 0 && dy < N)){
          queue.push([dx,dy])
        }
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
    }

    for (let i = 0; i < K; i++) {
      graph[location[i][0]][location[i][1]] = 1
    }

    let count = 0
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        if (graph[i][j] === 1) { 
          BFS(i, j)

          count++
        }
      }
    }

    console.log(count)
  }



  process.exit()
})