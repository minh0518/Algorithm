const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [R, C] = data.shift().split(' ').map(Number)

  let puzzle = data.map((i) => {
    return i.split('')
  })

  let visited = new Array(R).fill().map(() => new Array(C).fill(false))

  const goRightBfs = (i, j) => {
    let result = []

    let [dx, dy] = [0, 1] //오른쪽으로 이동

    let queue = []
    queue.push([i, j])
    

    while (queue.length) {
      let [x, y] = queue.shift()

      result.push(puzzle[x][y])
      visited[x][y] = true

      let nx = x + dx
      let ny = y + dy
      if (nx >= 0 && nx < R && ny >= 0 && ny < C) {
        if (puzzle[nx][ny] !== '#') {
          queue.push([nx, ny])
        } 
        else {
          return result
        }
      } 
      else {
        return result
      }
    }
  }

  const goDownBfs = (i, j) => {
    let result = []

    let [dx, dy] = [1, 0] //아래로 이동

    let queue = []
    queue.push([i, j])
    

    while (queue.length) {
      let [x, y] = queue.shift()

      result.push(puzzle[x][y])
      visited[x][y] = true

      let nx = x + dx
      let ny = y + dy
      if (nx >= 0 && nx < R && ny >= 0 && ny < C) {
        if (puzzle[nx][ny] !== '#') {
          queue.push([nx, ny])
        } 
        else {
          return result
        }
      } 
      else {
        return result
      }
    }
  }

  let words=[]
  
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (puzzle[i][j] !== '#' && !visited[i][j]) {
        words.push(goRightBfs(i, j).join(''))
      }
    }
  }

  visited = new Array(R).fill().map(() => new Array(C).fill(false))

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (puzzle[i][j] !== '#' && !visited[i][j]) {
        words.push(goDownBfs(i, j).join(''))
      }
    }
  }

  console.log(words.filter(i=>i.length>1).sort()[0])
  


  process.exit()
})