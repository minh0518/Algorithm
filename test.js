const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {


  let obj = {
    1: ['a', 'b', 'c'],
    3: ['a', 'b', 'c'],
  }

  obj[2] = [...(obj[2] || []), 'x']
  obj[3] = [...(obj[3] || []), 'x']

  console.log(obj)



  process.exit()
})
