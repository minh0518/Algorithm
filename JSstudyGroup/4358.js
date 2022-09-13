const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input.trim())
}).on('close', () => {
  let trees = data

  let info = {}

  for (let i = 0; i < trees.length; i++) {
    info[trees[i]] = info[trees[i]] === undefined ? 1 : info[trees[i]] + 1
  }

  let sortedInfo = []

  Object.keys(info)
    .sort()
    .map((i) => {
      sortedInfo.push(`${i} ${((info[i] / trees.length) * 100).toFixed(4)}`)
    })

  console.log(sortedInfo.join('\n'))


  process.exit()
})
