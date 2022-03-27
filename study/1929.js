const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

const solution = (num) => {
  let arr = new Array(num + 1).fill(true).fill(false, 0, 2)

  for (let i = 2; i * i <= num; i++) {
    if (arr[i]) {
      for (let j = i * i; j <= num; j += i) {
        arr[j] = false
      }
    }
  }

  return arr
}

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [M,N]=data.shift().split(' ').map(Number)

  let tmp=solution(N)

  let result = []
  for (let i = M; i < tmp.length; i++) {
    if (tmp[i] === true) {
      result.push(i)
    }
  }

  console.log(result.join('\n'))

  process.exit()
})
