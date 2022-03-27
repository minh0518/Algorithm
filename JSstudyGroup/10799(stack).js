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
  let expressions = data.shift().split('')

  let result = 0
  let sticks = []
  for (let i = 0; i < expressions.length; i++) {
    if (expressions[i] === '(') {
      if (expressions[i + 1] === ')') {
        result += sticks.length
        i++
      } else {
        sticks.push(expressions[i])
      }
    } else if (expressions[i] === ')') {
      sticks.pop()
      result++
    }
  }

  console.log(result)
  process.exit()
})
