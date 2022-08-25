const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let rome = data
  let result=[]
  let [I, V, X, L, C, D, M] = [1, 5, 10, 50, 100, 500, 1000]
  let table = {
    I,
    V,
    X,
    L,
    C,
    D,
    M,
  }
  
  let expression = []

  const ruleThree = (string) => {
    for (let j = 0; j < string.length; j++) {
      if (string[j] === 'I') {
        if (string[j + 1] === 'V') {
          string = string.split('IV').join('')
          expression.push(4)
          j--
        }
        if (string[j + 1] === 'X') {
          string = string.split('IX').join('')
          expression.push(9)
          j--
        }
      }

      if (string[j] === 'X') {
        if (string[j + 1] === 'L') {
          string = string.split('XL').join('')
          expression.push(40)
          j--
        }
        if (string[j + 1] === 'C') {
          string = string.split('XC').join('')
          expression.push(90)
          j--
        }
      }

      if (string[j] === 'C') {
        if (string[j + 1] === 'D') {
          string = string.split('CD').join('')
          expression.push(400)
          j--
        }
        if (string[j + 1] === 'M') {
          string = string.split('CM').join('')
          expression.push(900)
          j--
        }
      }
    }
    return string
  }

  const ruleOne = (string) => {
    for (let i = 0; i < string.length; i++) {
      for (let j = 0; j < Object.keys(table).length; j++) {
        if (string[i] === Object.keys(table)[j]) {
          //string = string.split(Object.keys(table)[j]).join('')
          string=string.replace(Object.keys(table)[j],'')
          i--
          expression.push(Object.values(table)[j])
        }
      }
    }
    return string
  }

  let numberResult = 0
  for (let i of rome) {
    ruleOne(ruleThree(i))
    numberResult+=(expression.reduce((a, b) => a + b))
    expression = []
  }

  result.push(numberResult)

  //숫자 변환 및 덧셈 완료


  let leftTable = { //이렇게 중간에 넣어주면 3번중복을 완벽히 막는다
    I,
    IV: 4,
    V,
    IX: 9,
    X,
    XL: 40,
    L,
    XC: 90,
    C,
    CD: 400,
    D,
    CM: 900,
    M,
  }

  const ruleFirst = (numberResult) => {
    let alphabet = []
    while (numberResult>0) {
      //console.log(numberResult)
      for(let j=Object.values(leftTable).length; j>=0; j--){
        if(numberResult>=Object.values(leftTable)[j]){
          numberResult-=Object.values(leftTable)[j]
          alphabet.push(Object.keys(leftTable)[j])
          break
        }
      }
    }

    return alphabet
  }

  result.push(ruleFirst(numberResult).join(''))


  console.log(result.join('\n'))


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