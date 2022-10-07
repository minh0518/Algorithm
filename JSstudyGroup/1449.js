const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, L] = data.shift().split(' ').map(Number)
  let location = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)

  location = location.map((i) => [i - 0.5, i + 0.5])

  let count = 0

  //console.log(location)

  for (let i = 0; i < N; i++) {
    if (i === N - 1) {
      count++
      break
    }
    let reachable = location[i][0] + L

    for (let j = i + 1; j < N; j++) {
      if (reachable < location[j][1]) {
        count++
        i = j - 1
        break
      }

      if (reachable === location[j][1]) {
        i = j //j 다음으로
        count++
        break
      } 
      else if (reachable > location[j][1]) { //reachable이 크면
                                              //끊어야 함

        if (j + 1 < N) {
          //런타임 에러 방지를 위해 인덱스 고려
          //(다음 인덱스가 없을 때)

          if (reachable < location[j + 1][1]) {
              count++
             i = j
             break
            }

          //reachable더 큰데 다음 위치가 남아 있으므로
          //ex) 4.5까지 도달가능한데 location[j + 1][1]가 3.5같은 경우
          //다음 j의 다음 for문으로 넘어감
         } 
          else {
           i = N - 2 //i++고려
                    //어차피 맨 위에서 i가 N-1되면 count++가 되므로
                    //여기선 count++ 안 해줌
           break
        }
      }
    }
  }

  console.log(count)

  process.exit()
})

//길이 3
// 0.5 1.5
// 1.5 2.5
// 4.5 5.5
// 6.5 7.5

//길이 4 (0.5부터 4.5인데 reachable > location[j][1]인 경우)
// 0.5 1.5
// 1.5 2.5
// 2.5 3.5
// 4.5 5.5
// 6.5 7.5

//길이2
//0.5 1.5
//1.5 2.5
//99.5 100.5
//100.5 101.5

//길이 3
// 0.5 1.5
// 1.5 2.5
// 2.5 3.5
// 3.5 4.5
// 6.5 7.5

//길이 3 
//4 3
// 0.5 1.5
// 1.5 2.5
// 2.5 3.5
// 3.5 4.5
// 4.5 5.5

//길이 1
// 0.5 1.5
// 1.5 2.5
// 2.5 3.5