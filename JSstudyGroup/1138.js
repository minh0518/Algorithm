const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let N = +data.shift()
  let people = data.shift().split(' ').map(Number)
  let arr = new Array(N).fill(false)

  for (let i = 0; i < N; i++) {
    let count = 0
    for (let j = 0; j < N; j++) {
      if (count === people[i]) {
        if (arr[j]) continue
        else {
          arr[j] = i + 1
          break 
        }
      }

      if (!arr[j]) count++

      //console.log(arr)
    }
  }

  console.log(arr.join(' '))

  process.exit()
})
