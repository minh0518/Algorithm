const { off } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  let N = +data.shift()
  let X = data.map((item) => ('' + item).split())
  let tmp = []
  let result = []

  const print = (tmp) => {
    tmp.sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1]
      } else {
        return a[0] - b[0]
      }
    })

    if (tmp.length) { //반드시 빈 배열인지 확인해야 한다
      let first = tmp.shift()

      if (first[1] !== 0) {
        result.push(first[1])
      } else {
        result.push(first[0])
      }
    }
    else{
      result.push(0)
    }
  }

  X.map((item) => {
    return item < 0 ? item.unshift(Number(item) * -1) : item
  })

  X = X.map((item) => item.map((i) => +i)) //숫자 변환

  X.map((item) => {
    if (item[0] !== 0 && !item[1]) {
      item.push(0)
    }
  }) //뒤에 0

  for (let i = 0; i < X.length; i++) {
    if (X[i][0] !== 0) {
      tmp.push(X[i])
    } else {
      print(tmp)
    }
  }

  console.log(result.join('\n'))

  process.exit()
})
