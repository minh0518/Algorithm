const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [L, C] = data.shift().split(' ').map(Number)

  let alphabet = data.shift().split(' ').sort()

  //console.log(alphabet)

  let result = []

  let checkList = ['a', 'e', 'i', 'o', 'u']

  const dfs = (str, visited, start, depth) => {
    if (depth === L) {
      result.push(str)
      return
    }

    for (let i = start + 1; i < C; i++) {
      if (!visited[i]) {
        dfs(str + alphabet[i], visited, i, depth + 1)
      }
    }
  }

  for (let i = 0; i < C; i++) {
    let visited = new Array(C).fill(false)
    if (i + L <= C) {
      dfs(alphabet[i], visited, i, 1)
    }
  }


  //마지막 필터링 (모음1개 , 자음2개)
  let sortedResult=[]
  for (let i = 0; i < result.length; i++) {
    let count = 0
    let string = result[i]
    for (let j = 0; j < checkList.length; j++) {
      if (string.includes(checkList[j])) {
        count++
      }
    }

    //모음이 1개이상 , 자음이2개 이상
    if(count>0 && L-count>=2){
      sortedResult.push(string)
    }
  }

  console.log(sortedResult.join('\n'))

  process.exit()
})

// 암호는 L개의 알파벳
// 최소 한 개의 모음(a, e, i, o, u)
// 최소 두 개의 자음
// 정렬된 암호 (abc -- o , bac -- x)

//주어진 C문자들을 조합해서 L개의 알파벳으로 된 암호 생성
