const { count } = require('console')
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
  let [N, M] = data.shift().split(' ').map(Number)

  let board = data.map((i) => i.split(''))
  //여기서 split()과 split('')의 차이

  let black = ['BWBWBWBW', 'WBWBWBWB']
  let white = ['WBWBWBWB', 'BWBWBWBW']

  let result=[]
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let countBlack = 0
      let countWhite = 0
      if (i + 8 <= N && j + 8 <= M) {
        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++) {
            if (board[i + x][j + y] !== black[x % 2][y]) {
              countBlack++
            }
            if (board[i + x][j + y] !== white[x % 2][y]) {
              countWhite++
            }
          }
        }
        result.push(Math.min(countBlack,countWhite))
        //한 좌표를 기준으로 black으로 시작 한 경우,white으로 시작 한 경우를
        //둘 다 비교해서 둘 중 최솟값을 push
      }
      
      //result.push(Math.min(countBlack,countWhite))
      //여기다 하면 if에 안 걸리더라도 countBlack,countWhite가 0으로 계속 push가 된다
    }
  }

  console.log(Math.min(...result))


  process.exit()
})