const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input.trim())
}).on('close', () => {
  let arr = [4, 7, 3, 1]

  let sortedArr = []

  arr.sort().map((i) => {
    sortedArr.push([i,i*10])
    
  })

  console.log(sortedArr)
  // [ 
  //   [ 1, 10 ], 
  //   [ 3, 30 ], 
  //   [ 4, 40 ], 
  //   [ 7, 70 ] 
  // ]
  
  // { 
  //   '1': 10, 
  //   '3': 30, 
  //   '4': 40, 
  //   '7': 70 
  // }


  process.exit()
})
