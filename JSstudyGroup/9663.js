const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {


  let N = +data.shift() // N*N 크기
  let result = 0 // 경우의 수를 담을 변수(최종 리턴할 값)
  let board = [] // 체스판 배열

  function hasConflict(x) {
    for (let i = 0; i < x; i++) {// 이전 행을 돌며 둘 수 없는 퀸인지 체크
																//i값은 행을 의미합니다

      if (board[i] === board[x]) {
        // 같은 열인지 체크
        return true
      }
      if (Math.abs(board[x] - board[i]) === x - i) {
        // 이전에 둔 퀸들의 대각선에 위치하는지 체크 (x는 i보다 클 수 밖에 없기 때문에 절대값 처리해주지 않아도됨)
        return true
      }
    }
    return false
  }

  function findNQueen(row) {
    if (row === N) {
      //마지막 행까지 진행됐다는건 경우의 수를 찾았다는 의미이므로 
			//result값을 증가
      result++
      return
    }
    for (let col = 0; col < N; col++) {
      board[row] = col
      if (!hasConflict(row)) {
        // 충돌하지 않는다면
        findNQueen(row + 1)
      }
    }
  }


  findNQueen(0) // 첫번째 행을 넣고 처음으로 findNQueen 함수를 실행
  console.log(result)

  process.exit()
})