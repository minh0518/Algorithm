const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, e, w, s, n] = data.shift().split(' ')
  let probs = [e / 100, w / 100, s / 100, n / 100]

  let [dx, dy] = [
    [0, 0, 1, -1],
    [1, -1, 0, 0],
  ]

  let visited = []

  let answer=0

  const dfs = (x, y, depth, prob) => {

    
    visited.push([x, y])
    //if문 전에 반드시 미리 push를 해줘야 한다
    //visited는 전역으로 관리가 되고 있고
    //방문배열에 우선 좌표를 찍고 만약 
    //if문에 걸려서 리턴된다면 pop을 해주는데
    //그래야 여기서 마지막에 방문한(=push한) 이 좌표를 pop해주는 것이다


                  //N이 2라면 2번까지는 방문을 하고 3번째부터 컷
                  //이 문제에서 처음 위치한 곳도 움직인 거라 했으므로
                  //시작이 1이다
    if (depth === (Number(N)+1)) {
      answer += prob
      return
    }

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i]
      let ny = y + dy[i]

      if (!isVisited([nx, ny])) {
        
        dfs(nx, ny, depth + 1, prob * probs[i])
        
        visited.pop() 

      }
    }
  }

  const isVisited = (arr) => {
    let [x, y] = arr

    let result = false

    visited.map((i) => {
      if (i[0] === x && i[1] === y) {
        result = true
      }
    })
    return result
  }

  dfs(0, 0, 1, 1)
  //이 문제에서 처음 위치한 곳도 움직인 거라 했으므로
  //depth의 시작은 1이다
  console.log(answer)

  process.exit()
})
