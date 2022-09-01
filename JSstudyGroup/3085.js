const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let N = data.shift()
  let candy = data.map((i) => i.split(''))
  let color = ['C', 'P', 'Z', 'Y']
  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ]

  //인접한 캔디가 몇개인지 확인하는 함수
  const check = (swappedCandy) => {
    //행 렬 기준으로 돌아가면서 카운트

    let count = 1
    // let rowResult=[]
    // let colResult=[]
    let result = []

    //행
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N - 1; j++) {
        if (swappedCandy[i][j] === swappedCandy[i][j + 1]) {
          count++
        } else {
          result.push(count)
          count = 1
        }
      }
      result.push(count)
      count = 1
    }

    //열
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N - 1; j++) {
        //console.log(j,i)

        if (swappedCandy[j][i] === swappedCandy[j + 1][i]) {
          count++
        } else {
          result.push(count)
          count = 1
        }
      }
      result.push(count) // 각 행or열이 끝날때도 push를 반드시 해줘야 한다
      //맨 마지막 값이 고려가 안된다
      //마지막 값까지 같다면 거기까지 count한 것을 저장해야 하는데
      //그렇게 안하고 그냥 넘어가버리면 안됨
      count = 1
    }

    // console.log(rowResult)
    // console.log(colResult)
    return Math.max(...result)
  }

  //인접한 두 칸 swap
  const swap = (x1, y1, x2, y2) => {
    if (candy[x1][x1] === candy[x2][y2]) return

    let swappedCandy = new Array(N).fill().map(() => new Array(N).fill(''))

    for (let i = 0; i < candy.length; i++) {
      swappedCandy[i] = [...candy[i]]
    }

    //2레벨 배열부터는 이런 방식만 가능함
    let tmp = swappedCandy[x1][y1]
    swappedCandy[x1][y1] = swappedCandy[x2][y2]
    swappedCandy[x2][y2] = tmp

    //console.log(swappedCandy)
    return swappedCandy
  }

  let final = []
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < 4; k++) {
        if (i + dx[k] < 0 || i + dx[k] >= N || j + dy[k] < 0 || j + dy[k] >= N)
          continue

        if (swap(i, j, i + dx[k], j + dy[k])) {
          //console.log(swap(i,j,i+dx[k],j+dy[k]))
          final.push(check(swap(i, j, i + dx[k], j + dy[k])))
        }
      }
    }
  }

  console.log(Math.max(...final))

  process.exit()
})

//처음 상태에서 한번 확인,
//이제부터 각 좌표에서부터 상하좌우로 1칸씩 다 스왑한 다음에 한번씩 확인
