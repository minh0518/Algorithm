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
  let S = data.shift().split('')

  let tmp = ''
  let isTag = false
  let answer = ''

  for (let i of S) {
    if (i === '<') {
      isTag = true
      answer += tmp.split('').reverse().join('') + i
      tmp = ''
    } else if (i === '>') {
      isTag = false
      answer += tmp + i
      tmp = ''
    } else if (i === ' ') {
      answer += isTag ? tmp + ' ' : tmp.split('').reverse().join('') + ' '
      tmp = ''
    } else {
      tmp += i
    }
  }

  if (tmp) {
    answer += tmp.split('').reverse().join('')
  }

  console.log(answer)

  process.exit()
})
