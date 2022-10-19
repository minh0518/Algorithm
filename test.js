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

  const dfs = (str, start, depth) => {
    if (depth === L) {
      result.push(str)
      return
    }

    for (let i = start + 1; i < C; i++) {
      
        dfs(str + alphabet[i], i, depth + 1)
      
    }
  }

  for (let i = 0; i < C; i++) {
  
    if (i + L <= C) {
      dfs(alphabet[i], i, 1)
    }
  }


  //������ ���͸� (����1�� , ����2��)
  let sortedResult=[]
  for (let i = 0; i < result.length; i++) {
    let count = 0
    let string = result[i]
    for (let j = 0; j < checkList.length; j++) {
      if (string.includes(checkList[j])) {
        count++
      }
    }

    //������ 1���̻� , ������2�� �̻�
    if(count>0 && L-count>=2){
      sortedResult.push(string)
    }
  }

  console.log(sortedResult.join('\n'))

  process.exit()
})

// ��ȣ�� L���� ���ĺ�
// �ּ� �� ���� ����(a, e, i, o, u)
// �ּ� �� ���� ����
// ���ĵ� ��ȣ (abc -- o , bac -- x)

//�־��� C���ڵ��� �����ؼ� L���� ���ĺ����� �� ��ȣ ����