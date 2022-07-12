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
  let word = data.shift()

  let results = []
  for (let i = 1; i < word.length; i++) {
    for (let j = i + 1; j < word.length; j++) {
      let tmp = [word.slice(0, i), word.slice(i, j),word.slice(j)]

      tmp = tmp.map((item) => {
        return item.split('').reverse().join('')
      })
      results.push(tmp.join(''))
      
    }
  }

  let a = results.sort()
  console.log(a[0])



  process.exit()
})
