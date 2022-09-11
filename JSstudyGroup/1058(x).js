const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let N = +data.shift()

  let friend = data.map((i) => i.split(''))

  let result = []
  for (let i = 0; i < N; i++) {
    let count = 0
    for (let j = 0; j < N; j++) {
      if (friend[i][j] !== 'Y') continue

      count++ //우선 자기가 친구들이니까 ++해줌
      
      for (let k = 0; k < N; k++) { //새로 탐색용 인덱스

        if (k === i) continue
        //새로로 오는데 자기 자신은 피해야 하므로
          
          
        if (friend[k][j] === 'Y') {
          //중복 제거
          if (friend[k][i] === 'N') { //이미 자기 자신을 알고 있으면 안되므로
            count++
          }
        }


      }
    }

    result.push(count)
  }

  console.log(Math.max(...result))
  process.exit()
})

//A가 B의 2-친구가 되기 위해서는
//B가 A의 2-친구가 되기 위해서는

//1. A B 서로 친구
//OR
//2. A C 친구, B C친구 > 같은 친구인 C가 존재 (친구의 친구)

//그래프를 보면 당연히 자기자신끼리는 친구가 아니므로 가운대 대각선은
//다 N이고
//A와 B가 친구면, B와 A도 친구이므로 그래프가 서로 대칭이다

//예시3
//A > B
//B > A , C
//C > B , D
//D > C , E
//E > D

// c가 bd랑 알고 2
// a가 b를 알고  3
// e가 d를 안다  4

//가로로 보면서 Y가 있으면
//위아래로 Y까지 다 카운트 하면 됨

//근데 이렇게만 하면 안됨

//예시1
//A > B , C
//B > A , C
//C > A , B

//A의 친구 B,C를 아는 사람들도 많은데 걔네들도 이미 A를 알고있음
//이런 중복은 피해줘야 함

//다시 예시3으로 가서
//C의 친구 B,D를 아는 사람이 있는지 위아래로 찾되,
//그 사람이 C를 알고 있으면 안됨

//가로로 보면서 Y가 있으면
//위아래로 Y까지 다 카운트 하면 됨
//이 때 위아래의 Y가 있는 가로 인덱스 중에서 자기 자신과 친구인 것은 제외
