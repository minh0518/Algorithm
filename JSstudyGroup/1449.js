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
      count++//마지막 종료할때 ++를 해줘야 한다
            //비교를 하다가 끝나면
            //조건이 어찌되든 마지막 부분까지 테이프를 붙이고 끝내야 하니까
      break
    }
    let reachable = location[i][0] + L

    for (let j = i + 1; j < N; j++) {
      if (reachable < location[j][1]) { 
        //현재 i좌표에서 테이프가 커버 가능한 거리가 2.5 까지면
        //다음 물이 세는 좌표가 5일때(4.5~5.5)

        count++
        i = j - 1 //j전까지 커버가 가능하므로 
                  //j위치로 이동 (-1한 것은 for때문에 ++하는 것 고려)
        break
      }

      if (reachable === location[j][1]) { 
         //현재 i좌표에서 테이프가 커버 가능한 거리가 2.5 까지면
         //다음 물이 세는 좌표가 2일때(1.5~2.5)

        
        i = j //현재 j까지 커버가 가능하므로
              //j 다음으로 이동 
        count++
        break
      } 
      else if (reachable > location[j][1]) { //reachable이 크면
                                              //끊어야 함
          //현재 i좌표에서 테이프가 커버 가능한 거리가 4.5 까지면
         //다음 물이 세는 좌표가 3일때(2.5~3.5)                               

        if (j + 1 < N) {
          //런타임 에러 방지를 위해 인덱스 고려
          //(다음 인덱스가 없을 때)

          if (reachable < location[j + 1][1]) {
            //한칸 더 뒤로 가서(j+1) 그 다음 좌표까지는 커버가 불가능하다면
            //j까지만 커버가 가능한 것이다

            count++
             i = j //j다음으로 이동 
             break
            }

          //한칸 더 뒤로 가서(j+1) 그 다음 좌표까지도 커버가 가능하다면
          //reachable >= location[j + 1][1]
          //ex) 4.5까지 도달가능한데 location[j + 1][1]가 3.5같은 경우
          //다음 j의 다음 for문으로 넘어감
         } 

          else { 
          //런타임 에러 방지를 위해 인덱스 고려
          //(다음 인덱스가 없을 때)
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