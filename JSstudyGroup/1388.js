const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

//풀고보니 여기서 count를 해주는 것은 필요가 없다


  //N이 행, M이 열
  let [N, M] = data.shift().split(' ').map(Number)

  let floor = data.map((i) => i.split(''))

  let visitied = new Array(N).fill().map(() => new Array(M).fill(false))

  let right = [0, 1]
  let down = [1, 0]

  const rightDFS = (i, j) => {
    let count = 1
    visitied[i][j] = true

    let nx = i + right[0]
    let ny = j + right[1]

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) return
    //for문으로 상하좌우 도는거면 continue인데
    //여긴 오른쪽 하나만 있으니까 for문이 끝난것이므로 return

    if (floor[nx][ny] === '-') {
      count += rightDFS(nx, ny)
    }

    return count
  }

  const downDFS = (i, j) => {
    let count = 1
    visitied[i][j] = true

    let nx = i + down[0]
    let ny = j + down[1]

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) return

    if (floor[nx][ny] === '|') {
      count += downDFS(nx, ny)
    }

    return count
  }

  let reusult = 0

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (floor[i][j] === '-' && !visitied[i][j]) {
        rightDFS(i, j)
       // console.log(visitied)
        reusult++
      } else if (floor[i][j] === '|' && !visitied[i][j]) {
        downDFS(i, j)
      //  console.log(visitied)
        reusult++
      }
    }
  }

  console.log(reusult)
  process.exit()
})