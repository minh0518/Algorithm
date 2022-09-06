const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let K = +data.shift()
  let info = data.map((i) => i.split(' ').map(Number))

  //가로들 ,세로들 모아놓고 최대값인 것들 추출
  let width = info.filter((i) => {
    return i[0] === 1 || i[0] === 2
  })

  let height = info.filter((i) => {
    return i[0] === 3 || i[0] === 4
  })
  width = width.sort((a, b) => {
    return b[1] - a[1]
  })[0][1]
  height = height.sort((a, b) => {
    return b[1] - a[1]
  })[0][1]

  //긴 변에서 처음으로 짧아지는 2개의 부분은 살아남는다
  let nextTwo = []
  for (let i = 0; i < info.length; i++) {
    if (info[i][1] === width || info[i][1] === height) {
      if (info[i + 1][1] === width || info[i + 1][1] === height) {
        //문제의 예제처럼 50 160이 연달아 나올 경우
        nextTwo.push(info[(i + 3) % 6][1], info[(i + 4) % 6][1])
      } else {
        nextTwo.push(info[(i + 2) % 6][1], info[(i + 3) % 6][1])
      }
      break
    }
  }

  let remove = 1
  for (let i = 0; i < nextTwo.length; i++) {
    remove *= nextTwo[i]
  }

  let result = K * (width * height - remove)
  console.log(result)

  process.exit()
})
