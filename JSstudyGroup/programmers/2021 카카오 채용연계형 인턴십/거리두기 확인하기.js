function solution(places) {


    const move =[[-1, 0], [1, 0], [0, -1], [0, 1]]
    const SIZE = 5

    const isValid = (x, y) => {
      return (x >= 0 && y >= 0 && x < SIZE && y < SIZE)
    }
    const isAvailableSeat = (x, y, visited) =>{
      return(isValid(x, y) && visited[x][y] === 0)
    }
      

    // bfs
    const bfs = (start, info, visited) => {
      let queue = [start]

      while (queue.length > 0) {
        const [x, y, n] = queue.shift()

        //bfs는 항상 shift해놓고 그 값에 대한 조건을 걸어줘야 한다
        //여기서 조건이란 바로 다음 shift를 해야 하는 조건이다
        

        if (n !== 0 && info[x][y] === 'P') return false
        //p를 만나면 끝나는 것인데
        //맨 처음 시작할때 p부터 시작한다(n이 0)
        //그래서 n은 0이 아니라는 조건을 추가한다

        move.forEach(([mx, my]) => {
          const dx = x + mx
          const dy = y + my

          if (isAvailableSeat(dx,dy, visited) && info[dx][dy] != 'X') {
            if (n < 2) {
                  //거리가 2인 범위 내에서 dfs탐색을 시도한다
                  //거리가 2인 범위 내에서 p가 발견되면 false를 리턴
              visited[dx][dy] = 1
              queue.push([dx,dy, n + 1])
            }//애초에 거리가 2 이상이 되면, queue에 push를 하지 않는다
              //그러므로 queue를 계속 shift하다가 이 while이 끝나게 된다
          }
        })
      }

      return true
    }


    const checkDistancing = (info) => {
      
      //방문처리 배열
      let visited = new Array(SIZE)
      for(let i=0; i<SIZE; i++){
        visited[i]=new Array(SIZE).fill(0)
      }

      for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
          if (info[i][j] !== 'P') continue

          //P를 만나면 방문처리하고 탐색 시작
          visited[i][j] = 1
          if (!bfs([i, j, 0], info, visited)) return 0
        }
      }

     // console.log(visited)
    //결국 1은 탐색을 다 한 것이고
    //0은 x가 있던 곳이라 탐색을 하지 않은 것이다
      return 1
    }



    return places.map(checkDistancing)
  }

  console.log(solution([["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]))