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
    //if문에 걸려서 리턴된다거나 for문을 다 도는데 이미 4개 방면으로
    //다 방문을 했다면 이 재귀는 끝이 나게 되는데
    //그러고 나면 직전 재귀에서 바로 pop을 해준다
    //그러므로 pop을 한 좌표는 여기서 마지막에 방문한(=push한) 이 좌표를 pop해주는 것이다


    if (depth === (Number(N))) {
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


	//이미 방문했는지 확인
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

  dfs(0, 0, 0, 1)
  //N이 2라면 시작 좌표를 제외하고
  //2번 이동을 하는 것이다
  //ex) (시작 - 동쪽 - 북쪽)

  //그래서 N이2라면 2번움직여고 끝내야 하므로
  //depth를 0으로 주고 
  //재귀 종료 조건을 depth가 N과 같을 때로 해줬다

  
  console.log(answer)

  process.exit()
})