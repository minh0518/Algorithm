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

  let houses = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)

  if (N % 2 === 0) {
    console.log(houses[(N / 2) - 1])
  } 
  else {
    console.log(houses[parseInt(N / 2)])
    //parseInt안하면 오답
  }

  
  process.exit()
})

//1~5   1~7   1~9

//(5~1) 5~7   5~9

//(7~1) (7~5) 7~9

//(9~1) (9~5) (9~7)

//1 2 3  13

//12 1 2
//1 1 11
//2 1 11

//1 2  7  12 13
//12 11 6 1
//6 5 5 6
