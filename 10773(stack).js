const { off, mainModule } = require('process')
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
  data.shift()

  let number = data.map((item) => +item)

  let stack = []
  for (let i of number) {
    if (i === 0) {
      stack.pop()
    } else {
      stack.push(i)
    }
  }

  let result = 0
  if (!stack.length) {
    result = 0
  } else {
    for (let i of stack) {
      result += i
    }
  }

  console.log(result)

  process.exit()
})
