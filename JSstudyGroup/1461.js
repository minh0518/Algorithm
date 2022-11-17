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
  let cord = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)

  // [ -39, -37, -29, -28, -6,   2,  11]

  // 가장 먼 곳 : 39
  // > 39 37 은 맨 마지막에 (39만 가는게 아니라 37까지도 가야 하는 것이 핵심이다)

  // 11 *2 (양)
  //29*2 (29 28까지) >> 6 28 | 29 냐  ,  6 | 28 29 냐 이것 중에선 후자다
  //                    이건 28*2+29*2고         6*2+29*2이기 때문
  //                    그니까 한번 갔다가 돌아오는 경우는 최대한 멀리갔다가 와야 한다
  //                    안 그러면 또 다시 가야함 (28까지 갔다 29 가는 것보다 29가면서 28까지 해결하는게 나음)
  //6*12
  //39

  let plus = [] // 양수에 위치하는 책들
  let minus = [] // 음수에 위치하는 책들

  cord.map((i) => {
    if (i > 0) {
      plus.push(i)
    } else {
      minus.push(Math.abs(i))
    }
  })

  plus = plus.sort((a, b) => b - a)
  minus = minus.sort((a, b) => b - a)

  let result = []
  if (!minus.length || plus[0] > minus[0]) { //minus가 undefined면 비교가 안되니까 조건 추가
    result.push(plus[0])
    plus = plus.slice(M) //plus가 없어도
  }
  // else if(plus[0]===minus[0]){
  // }
  else if (!plus.length || plus[0] <= minus[0]) {
    result.push(minus[0])
    minus = minus.slice(M)
  }

  while (minus.length || plus.length) {
    if (minus.length) {
      if (minus.length >= 2) {
        result.push(minus[0] * 2)
        minus = minus.slice(M)
      } else {
        result.push(minus[0] * 2)
        minus = minus.slice(1)
      }
    }

    if (plus.length) {
      if (plus.length >= 2) {
        result.push(plus[0] * 2)
        plus = plus.slice(M)
      } else {
        result.push(plus[0] * 2)
        plus = plus.slice(1)
      }
    }
  }

  console.log(result.reduce((a, b) => a + b, 0))

  process.exit()
})

//가장 큰 값이 같을때도 상관이 없는게
// [ 39, 12, 11, 2 ] [ 39, 37, 36, 35, 6 ]
//어차피 둘 중 하나를 지우면 다른 39까지 가야 한다
//그러면 M이 2니까 가는 김에 39 다음의 값도 알아서 지워지게 된다
//그러므로 39로 둘 다 같더라도 굳이 다음의 수까지 고려하면서
//끝까지 둘 중 어느 것에서 빼야할지 정하지 않아도 된다