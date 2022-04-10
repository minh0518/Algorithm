

//이 문제는 현재 백준에서 메모리 초과를 발생 시킵니다.
//그러므로 다른 로직이 필요하지만 우선 정답자체는 제대로 출력이 되기에
//배열 좌표 학습용으로 우선 기록해 두었습니다


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
  //여기서 N이 열 , M이 행
  let [N, M] = data
    .shift()
    .split(' ')
    .map((item) => +item) //map(Number)

  //행렬 개념으로 치면 (M,N)
  //문제에서 사용하는 좌표는 (N,M)
  //행렬개념으로 한 다음에 마지막에 좌표만 뒤바꿔줘도 된다
  //중요한 것은 왼쪽아래가 0,0이라는 것인데 이것도 기존 행렬개념으로 하고
  //마지막에 좌표만 수정 할 예정
  let floor = new Array(M)
  for (let i = 0; i < M; i++) {
    floor[i] = new Array(N).fill(0)
  }

  //이것도 렬렬. 모든걸 행렬개념으로하고 마지막에 좌표만 뒤바꾸자
  let direction = [
    //순서대로 우 상 좌 하
    [0, -1, 0, 1],
    [1, 0, -1, 0],
  ]

  let [x, y] = [M - 1, 0] // 행열개념. 길이가 M이면 좌표는 M-1로해야함
  let [dx, dy] = [x, y]
  let visited = []

  let count = 0
  let i = 0
  floor[x][y]=1  //반드시 시작지점도 방문처리를 해야 한다
  while (count !== (N*M)-1) {
   // console.log(`i=${i}`)
    dx = x + direction[0][i % 4]
    dy = y + direction[1][i % 4]
//기존 좌표에서 더해야 한다. dx+=direction[0][i % 4] 는 절대 안된다

    //console.log(`dx : ${dx}, dy : ${dy}`)

    //이게 문젠데 지금
    if (dx < 0 || dy < 0 || dx > M || dy > N) { 
								//반드시 0보다 커야 하는 것도 고려해야 한다
    //  console.log('범위 초과')
      i++
      continue
    } else {
      if (floor[dx][dy] === 0) {
        x = dx
        y = dy
        visited.push([x, y])
        floor[x][y] = 1 //방문처리
        count++
      //  console.log('count++')
      } else {
       // console.log('방문했었음')
        i++
        continue
      }
    }
  }

  // console.log(visited)
  // console.log(count)
   console.log(floor)


  x=(M-1)-x
  console.log(y,x)
  process.exit()
})


//r을 찾는다 칠때
//r > 1,2 (문제기준)
//  > 2,2 (실제 행렬좌표) 

//t를 찾는다 칠때
//t > 1,4 (문제기준)
//  > 2,4 (실제 행렬좌표) 

//생각해보니 색종이 문제처럼 열좌표는 똑같고 행만 다르다
//그러면 출발선을 왼쪽아래좌표로 주고
//다 구한 다음에 마지막에 행 좌표를 %로 변환해준 다음에
//행 열 좌표만 바꿔서 출력해볼까