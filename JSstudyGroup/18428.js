const { off } = require('process')
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
  let N = +data.shift()

  let hall = data.map((item) => item.split(' '))

  let answer = false

  const check = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (hall[i][j] === 'T') {
          for (let x = i + 1; x < N; x++) {
            if (hall[x][j] === 'S') {
              return false
            }
            if (hall[x][j] === 'O') {
              //이미 같은 라인에 O가 있으면 방어가 되니까
              break
            }
          }
          for (let x = i - 1; x >= 0; x--) {
            if (hall[x][j] === 'S') {
              return false
            }
            if (hall[x][j] === 'O') {
              break
            }
          }
          for (let y = j + 1; y < N; y++) {
            if (hall[i][y] === 'S') {
              return false
            }
            if (hall[i][y] === 'O') {
              break
            }
          }
          for (let y = j - 1; y >= 0; y--) {
            if (hall[i][y] === 'S') {
              return false
            }
            if (hall[i][y] === 'O') {
              break
            }
          }
        }
      }
    }
    return true
  }
  const dfs = (count) => {
    if (answer) {
      return
    }
    if (count === 3) {
      answer = check()
      return
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (hall[i][j] === 'X') {
          hall[i][j] = 'O'
          dfs(count + 1)
          hall[i][j] = 'X'
        }
      }
    }
  }

  dfs(0)
  if(answer){
    console.log('YES')
  }
  else{
    console.log('NO')
  } 
  

  process.exit()
})

