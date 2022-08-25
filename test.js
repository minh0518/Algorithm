const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  let table={
    a:1,
    b:2,
    c:3
  }

  for(let i in table){
    console.log(i,table[i])
    // a 1
    // b 2
    // c 3
  }
  process.exit()
})


//보통 큰 숫자를 왼쪽에 작은 숫자를 오른쪽에 쓰며 값을 다 더한다

// V, L, D 한번만
//  I, X, C, M은 연속해서 세 번까지만

//왼쪽이 작은 경우는 (오른쪽-왼쪽 이다)
// IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900
//이들 각각은 한 번씩만
//IV 와 IX
//XL 과 XC
//CD 와 CM  는 같이 쓸 수 없으며
//이 조건의 우선순위가 가장 높다