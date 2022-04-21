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

  const obj = {
    d: 'ddd',
    a: 'aaa',
    c: 'ccc',
    b: 'bbb',
    e: 'eee',
  }

  const newObj = {}
  Object.keys(obj).sort().forEach(function (key) {
      newObj[key] = obj[key]
    })
  console.log(newObj) /* {a: 'aaa', b: 'bbb', c: 'ccc', d: 'ddd', e: 'eee'} */

  process.exit()
})
