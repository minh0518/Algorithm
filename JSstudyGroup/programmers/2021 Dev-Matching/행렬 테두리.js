function solution(rows, columns, queries) {
    let arr = new Array(rows).fill().map(() => [])
    let arr2 = new Array(rows).fill().map(() => [])

    //arr , arr2 �ʱ�ȭ
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        arr[i][j] = j + 1 + i * columns
        arr2[i][j] = j + 1 + i * columns
      }
    }

    const rotate = (x1, y1, x2, y2) => {
      let tmp = []

      //���� x1~x2 , y1~y2
      for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
          if (!(i === x1 || i === x2 || j === y1 || j === y2)) {
            continue
          }

          tmp.push(arr[i][j])

          if (i === x1) {
            //�� ���� �׵θ�

            if (j === y1) {
              //ù��° �� ���� ���̵�
              arr[i][j] = arr2[i + 1][j]
            } else if (j !== y1) {
              //ù��° �� �߰��� ������
              arr[i][j] = arr2[i][j - 1]
            }
          } else if (i !== x1 && i !== x2) {
            //�� ���̵� �׵θ�
            if (j === y1) {
              //���� �׵θ�
              arr[i][j] = arr2[i + 1][j]
            } else if (j === y2) {
              //������ �׵θ�
              arr[i][j] = arr2[i - 1][j]
            }
          } else if (i === x2) {
            //�� �Ʒ� �׵θ�
            if (j === y2) {
              //ù��° �� ������ ���̵�
              arr[i][j] = arr2[i - 1][j]
            } else if (j !== y2) {
              //ù��° �� �߰� , �� ����
              arr[i][j] = arr2[i][j + 1]
            }
          }
        }
      }

      //���������ڸ� ���� ���� ����
      //2�����̾ �̷��� �����ϴ� ����� �ִ�
      //for���� ������ row.length�� �ص� ��
      for (let i = 0; i < arr.length; i++) {
        arr2[i] = [...arr[i]]
      }

      return Math.min(...tmp)
    }



    

    //���η���
    let answer = []
    for (let i = 0; i < queries.length; i++) {
      //-1�� ���� �迭�� �ε����� ���߱� ����
      let [x1, y1] = [queries[i][0] - 1, queries[i][1] - 1]
      let [x2, y2] = [queries[i][2] - 1, queries[i][3] - 1]
      answer.push(rotate(x1, y1, x2, y2))
    }

    return answer
  }

  console.log(solution(6, 6, [[2, 2, 5, 4],[3, 3, 6, 6],[5, 1, 6, 3]]))
  console.log(solution(3, 3, [[1, 1, 2, 2],[1, 2, 2, 3],[2, 1, 3, 2],[2, 2, 3, 3]]))
  console.log(solution(100, 97, [[1, 1, 100, 97]]))