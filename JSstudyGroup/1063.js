const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [king, stone, N] = data.shift().split(' ')
  let move = data



  const location = {
    R: [0, 1],
    L: [0, -1],
    B: [-1, 0], //여기 좌표는 아래서부터 시작하므로
    T: [1, 0],
    RT: [1, 1],
    LT: [1, -1],
    RB: [-1, 1],
    LB: [-1, -1],
  }

  for (let i = 0; i < N; i++) {
    let kingRow = Number(king[1])
    let kingCol = king[0].charCodeAt(0) - 64
    let stoneRow = Number(stone[1])
    let stoneCol = stone[0].charCodeAt(0) - 64

    let [row, col] = location[move[i]]

    if (kingRow + row > 8 || kingRow + row<1|| kingCol + col > 8 || kingCol + col<1) {
      //console.log(`킹 아웃`)
      continue
    }

    if (kingRow + row == stoneRow && kingCol + col == stoneCol) {
      if (stoneRow + row > 8 ||stoneRow + row<1 || stoneCol + col > 8 || stoneCol + col <1) {
        //console.log(`돌 아웃`)
        continue
      }
      //console.log(`겹침${king},${stone}`)
      king = king.replace(king[1], kingRow + row)
      king = king.replace(king[0], String.fromCharCode(kingCol+64 + col))
      stone = stone.replace(stone[1], stoneRow + row)
      stone = stone.replace(stone[0], String.fromCharCode(stoneCol+64 + col))
      
      
    } else {
      king = king.replace(king[1], kingRow + row)
      king = king.replace(king[0], String.fromCharCode(kingCol+64 + col))
      //console.log(`${king},${stone}`)
    }
  }

  //console.log('===')

  console.log(king)
  console.log(stone)

  // let a='A1'
  
  // a=a.replace(a[0],String.fromCharCode((a[0].charCodeAt(0))+2))
  // a=a.replace(a[1],(Number(a[1])+2))
  // console.log(a)

  // console.log(a[1])
  // let a='ab'
  // a=a.replace(a[0],'c')
  // console.log(a)

  process.exit()
})