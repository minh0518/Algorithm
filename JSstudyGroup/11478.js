const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let S = data.shift()

  let result = new Set()
  for (let i = 1; i <= S.length; i++) {
    for (let j = 0; j < S.length; j++) {
      if (j + i > S.length) continue //이거 = 없어야 함

      result.add(S.slice(j, j + i))
    }
  }

  console.log(result.size)

  process.exit()
})

//substr(), substring(), slice() 
//https://hianna.tistory.com/340

//이 문제는 중복처리가 핵심인데
//set안쓰고 이진트리탐색으로 중복을 찾는 것도 방법이 될듯