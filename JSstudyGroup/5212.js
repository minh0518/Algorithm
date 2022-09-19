const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [row, col] = data.shift().split(' ').map(Number)

  let map = data.map((i) => {
    return i.split('')
  })

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ]

  let waterCord = []

  const turnWater = (x, y) => {
    let count = 0

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i]
      let ny = y + dy[i]

      if (nx >= 0 && nx < row && ny >= 0 && ny < col) {
        if (map[nx][ny] === 'X') {
          //�簢�� �۵� �ٴٿ��� �׳� x�� ������ ���°� ����
          count++
        }
      }
    }

    if (count < 2) {
      //x�� ������ 2���� ������ �ٴٷ� ����
      //x�� �ּ��� 2���� �־�� ������ ���� ����
      return true
    } else {
      return false
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (map[i][j] !== 'X') continue

      if (turnWater(i, j)) {
        waterCord.push([i, j])
      }
    }
  }

  waterCord.map((i) => {
    map[i[0]][i[1]] = '.'
  })

  //console.log(map)

  let locateX=[]
  let locateY=[]
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if(map[i][j]!=='X') continue


      locateX.push(i)
      locateY.push(j)
    }
  }

  let minRow=Math.min(...locateX)
  let maxRow=Math.max(...locateX)
  let minCol=Math.min(...locateY)
  let maxCol=Math.max(...locateY)
  

  let result=[]
  // for(let i=minRow; i<=maxRow; i++){
  //   result.push([])
  //   for(let j=minCol; j<=maxCol; j++){
  //     result[result.length-1].push(map[i][j])
  //   }
  // }

  for(let i=minRow; i<=maxRow; i++){
    for(let j=minCol; j<=maxCol; j++){
      result.push(map[i][j])
    }
    result.push('\n')
  }

  console.log(result.join(''))

  process.exit()
})

//�̰� �׷����̷����� ��� Ǯ��?

//�����¿쿡�� 3�� �̻��� �ٴٸ� ���

// ..........
// ..XX...X..
// .XX.......

// .XX...X
// XX.....