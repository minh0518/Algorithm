const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []


//답을 구하는 함수
const check = (lines) => {
  for (let i = 0; i < lines.length - 2; i++) {
    if (lines[i]<lines[i + 1]+lines[i + 2]) {
      return(lines[i]+lines[i + 1]+lines[i + 2])
    }
//여기다가 else해서 -1하면 안됨
//맨 처음 3개의 수만 보고 안되면 바로 -1리턴하니까.
//마지막케이스 보면 20 말고 다음 것들에서 출력하는 것을 볼 수 있다
  }
}

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  data.shift()
  let lines =data.map((item) => Number(item))

  lines.sort((a, b) => { //내림차순 정렬
    return b - a
  })
  
  let tmp = check(lines)

  console.log(tmp!==undefined ? tmp : -1)
  //선언만하고 값이 넘어오지 않았다면 undefined
  

  process.exit()
})
