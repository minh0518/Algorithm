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

  let count = 0

  for (let i = 0; i < word.length; i++) {
    count++
    switch (word[i]) {
      case 'c':
        if (word[i + 1] === '=' || word[i + 1] === '-') {
          i++
        }
        break
      case 'd':
        if (word[i + 1] === '-'){
          i++
        }
        else if(word[i + 1] === 'z' && word[i + 2] === '=') {
          i+=2
        }
        break
      case 'l':
        if (word[i + 1] === 'j') {
          i++
        }
        break
      case 'n':
        if (word[i + 1] === 'j') {
          i++
        }
        break
      case 's':
        if (word[i + 1] === '=') {
          i++
        }
        break
      case 'z':
        if (word[i + 1] === '=') {
          i++
        }
        break
    }
  }

  console.log(count)



  process.exit()
})
