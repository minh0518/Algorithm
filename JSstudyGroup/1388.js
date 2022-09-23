const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

//Ǯ���� ���⼭ count�� ���ִ� ���� �ʿ䰡 ����


  //N�� ��, M�� ��
  let [N, M] = data.shift().split(' ').map(Number)

  let floor = data.map((i) => i.split(''))

  let visitied = new Array(N).fill().map(() => new Array(M).fill(false))

  let right = [0, 1]
  let down = [1, 0]

  const rightDFS = (i, j) => {
    let count = 1
    visitied[i][j] = true

    let nx = i + right[0]
    let ny = j + right[1]

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) return
    //for������ �����¿� ���°Ÿ� continue�ε�
    //���� ������ �ϳ��� �����ϱ� for���� �������̹Ƿ� return

    if (floor[nx][ny] === '-') {
      count += rightDFS(nx, ny)
    }

    return count
  }

  const downDFS = (i, j) => {
    let count = 1
    visitied[i][j] = true

    let nx = i + down[0]
    let ny = j + down[1]

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) return

    if (floor[nx][ny] === '|') {
      count += downDFS(nx, ny)
    }

    return count
  }

  let reusult = 0

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (floor[i][j] === '-' && !visitied[i][j]) {
        rightDFS(i, j)
       // console.log(visitied)
        reusult++
      } else if (floor[i][j] === '|' && !visitied[i][j]) {
        downDFS(i, j)
      //  console.log(visitied)
        reusult++
      }
    }
  }

  console.log(reusult)
  process.exit()
})