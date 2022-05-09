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

        //bfs�� �׻� shift�س��� �� ���� ���� ������ �ɾ���� �Ѵ�
        //���⼭ �����̶� �ٷ� ���� shift�� �ؾ� �ϴ� �����̴�
        

        if (n !== 0 && info[x][y] === 'P') return false
        //p�� ������ ������ ���ε�
        //�� ó�� �����Ҷ� p���� �����Ѵ�(n�� 0)
        //�׷��� n�� 0�� �ƴ϶�� ������ �߰��Ѵ�

        move.forEach(([mx, my]) => {
          const dx = x + mx
          const dy = y + my

          if (isAvailableSeat(dx,dy, visited) && info[dx][dy] != 'X') {
            if (n < 2) {
                  //�Ÿ��� 2�� ���� ������ dfsŽ���� �õ��Ѵ�
                  //�Ÿ��� 2�� ���� ������ p�� �߰ߵǸ� false�� ����
              visited[dx][dy] = 1
              queue.push([dx,dy, n + 1])
            }//���ʿ� �Ÿ��� 2 �̻��� �Ǹ�, queue�� push�� ���� �ʴ´�
              //�׷��Ƿ� queue�� ��� shift�ϴٰ� �� while�� ������ �ȴ�
          }
        })
      }

      return true
    }


    const checkDistancing = (info) => {
      
      //�湮ó�� �迭
      let visited = new Array(SIZE)
      for(let i=0; i<SIZE; i++){
        visited[i]=new Array(SIZE).fill(0)
      }

      for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
          if (info[i][j] !== 'P') continue

          //P�� ������ �湮ó���ϰ� Ž�� ����
          visited[i][j] = 1
          if (!bfs([i, j, 0], info, visited)) return 0
        }
      }

     // console.log(visited)
    //�ᱹ 1�� Ž���� �� �� ���̰�
    //0�� x�� �ִ� ���̶� Ž���� ���� ���� ���̴�
      return 1
    }



    return places.map(checkDistancing)
  }

  console.log(solution([["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]))