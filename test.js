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

  let soldier = data.map((i) => i.split(''))

  let count = 0
  let wCount=[]
  let bCount=[]

  const dfs = (x, y,color) => {
    if (x >= 0 && x < M && y >= 0 && y < N) {
      if (soldier[x][y] === color) {
        //(재귀로 호출된 즉, 이동한 곳에 대해)
        //방문 여부 확인

        count++
        soldier[x][y] = 0

        dfs(x + 1, y,color) //아래
        dfs(x, y + 1,color) //오른쪽
        dfs(x - 1, y,color) //위
        dfs(x, y - 1,color) //왼쪽
      } else {
        //재귀 함수 종료조건
        return
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (soldier[i][j] === 'W') {
        dfs(i, j,'W')
        wCount.push(count)
        count=0
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (soldier[i][j] === 'B') {
        dfs(i, j,'B')
        bCount.push(count)
        count=0
      }
    }
  }

 
  let result=[]

  result.push((wCount.map(i=>(i*i)).reduce((a,b)=>a+b,0)))
  result.push((bCount.map(i=>(i*i)).reduce((a,b)=>a+b,0)))
  

  console.log(result.join(' '))
  

  process.exit()
})
