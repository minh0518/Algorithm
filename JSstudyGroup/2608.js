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

  //���� ��ȯ �� ���� �Ϸ�


  let leftTable = { //�̷��� �߰��� �־��ָ� 3���ߺ��� �Ϻ��� ���´�
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


//���� ū ���ڸ� ���ʿ� ���� ���ڸ� �����ʿ� ���� ���� �� ���Ѵ�

// V, L, D �ѹ���
//  I, X, C, M�� �����ؼ� �� ��������

//������ ���� ���� (������-���� �̴�)
// IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900
//�̵� ������ �� ������
//IV �� IX
//XL �� XC
//CD �� CM  �� ���� �� �� ������
//�� ������ �켱������ ���� ����