function solution(rows, columns, queries) {
  let arr = new Array(rows).fill().map(() => [])
  let arr2 = new Array(rows).fill().map(() => [])

  //arr , arr2 초기화
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      arr[i][j] = j + 1 + i * columns
      arr2[i][j] = j + 1 + i * columns
    }
  }

  const rotate = (x1, y1, x2, y2) => {
    let tmp = []

    //범위 x1~x2 , y1~y2
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        if (!(i === x1 || i === x2 || j === y1 || j === y2)) {
          continue
        }

        tmp.push(arr[i][j])

        if (i === x1) {
          //맨 위쪽 테두리

          if (j === y1) {
            //첫번째 행 왼쪽 사이드
            arr[i][j] = arr2[i + 1][j]
          } else if (j !== y1) {
            //첫번째 행 중간과 오른쪽
            arr[i][j] = arr2[i][j - 1]
          }
        } else if (i !== x1 && i !== x2) {
          //양 사이드 테두리
          if (j === y1) {
            //왼쪽 테두리
            arr[i][j] = arr2[i + 1][j]
          } else if (j === y2) {
            //오른쪽 테두리
            arr[i][j] = arr2[i - 1][j]
          }
        } else if (i === x2) {
          //맨 아래 테두리
          if (j === y2) {
            //첫번째 행 오른쪽 사이드
            arr[i][j] = arr2[i - 1][j]
          } else if (j !== y2) {
            //첫번째 행 중간 , 맨 왼쪽
            arr[i][j] = arr2[i][j + 1]
          }
        }
      }
    }

    //전개연산자를 통한 깊은 복사
    //2레벨이어도 이렇게 복사하는 방법이 있다
    //for문의 조건을 row.length로 해도 됨
    for (let i = 0; i < arr.length; i++) {
      arr2[i] = [...arr[i]]
    }

    return Math.min(...tmp)
  }



  

  //메인로직
  let answer = []
  for (let i = 0; i < queries.length; i++) {
    //-1한 것은 배열의 인덱스를 맞추기 위함
    let [x1, y1] = [queries[i][0] - 1, queries[i][1] - 1]
    let [x2, y2] = [queries[i][2] - 1, queries[i][3] - 1]
    answer.push(rotate(x1, y1, x2, y2))
  }

  return answer
}

console.log(solution(6, 6, [[2, 2, 5, 4],[3, 3, 6, 6],[5, 1, 6, 3]]))
console.log(solution(3, 3, [[1, 1, 2, 2],[1, 2, 2, 3],[2, 1, 3, 2],[2, 2, 3, 3]]))
console.log(solution(100, 97, [[1, 1, 100, 97]]))