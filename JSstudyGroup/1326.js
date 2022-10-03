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

  let bridge = data.shift().split(' ').map(Number)

  let [start, end] = data.shift().split(' ').map(Number)

  const bfs = (start, end) => {

    let queue = []
    queue.push(start - 1) //(인덱스 단위로) 시작노드의 위치를 넣음

    let check = new Array(N).fill(-1) 
		//각 징검다리별까지 이동해야 하는 횟수 기록

    check[start - 1] = 0 //처음 방문하면 0으로

    while (queue.length) {
      //여기서부터는 다 인덱스 기준

      let node = queue.shift() //노드 인덱스를 꺼냄

      for (let i = node; i < N; i++) {
        //해당 노드부터 끝까지 가는걸 계산
        if ((i - node) % bridge[node] !== 0) continue //시작점부터 해당 배수만큼 점프

        if (check[i] === -1) {//전체 bfs과정에서 아직 밟지 않은 징검다리라면

          queue.push(i) //큐에 넣어주고(=다음에 방문할 징검다리 인덱스)
          check[i] = check[node] + 1 //현재 징검다리로부터 온 것이므로
          //이 루프의 시작지점인 check[node]값에서 1을 더해준 값을 넣어줌



          //이게 적용되지 않는 것이면 현재 징검다리 배수로는 끝지점에
          //도달하지 못하는 것
          //그러므로 다음 while문에서 queue에서 새로운 값을 꺼내서
          //다시 진행해야 함
          if (i === end - 1) {
            //i는 시작점부터 밟게 되는 현재 징검다리 위치인데
            //이게 도착지점까지 가면 끝
            return check[i]
          }
        }
      }

			//양방향이므로 뒤로 가는 경우도 만듦
			//i가 역순으로 가는 것 제외하고 나머지는 똑같음
      for (let i = node; i > -1; i--) {
        if ((i - node) % bridge[node] !== 0) continue

        if (check[i] === -1) {
          queue.push(i)
          check[i] = check[node] + 1
          if (i === end - 1) {
            return check[i]
          }
        }
      }

    }
    return -1
  }

  console.log(bfs(start, end))

  process.exit()
})

// for (let i = 3; i < 20; i++) {
//   if ((i - 3) % 4 !== 0) continue
//   console.log(i)

//   // 3 부터 시작 , 4의 배수
//   // 3  7 11 15
// }