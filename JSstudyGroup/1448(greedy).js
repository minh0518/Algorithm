const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

const check = (lines) => {
  for (let i = 0; i < lines.length - 2; i++) {
    if (lines[i]<lines[i + 1]+lines[i + 2]) {
      return(lines[i]+lines[i + 1]+lines[i + 2])
    }
  }
}

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  data.shift()
  let lines =data.map((item) => Number(item))

  lines.sort((a, b) => {
    return b - a
  })
  
  let tmp = check(lines)
  if(tmp){
    console.log(tmp)
  }
  else{
    console.log(-1)
  }
  

  process.exit()
})
//삼각형이 만들어질 조건은
//삼각형에서 가장 긴 변의 길이는 나머지 두 변의 길이의 합보다 작다
