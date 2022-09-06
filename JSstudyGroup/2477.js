const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let K = +data.shift()
  let info = data.map((i) => i.split(' ').map(Number))

  //���ε� ,���ε� ��Ƴ��� �ִ밪�� �͵� ����
  let width = info.filter((i) => {
    return i[0] === 1 || i[0] === 2
  })

  let height = info.filter((i) => {
    return i[0] === 3 || i[0] === 4
  })
  width = width.sort((a, b) => {
    return b[1] - a[1]
  })[0][1]
  height = height.sort((a, b) => {
    return b[1] - a[1]
  })[0][1]

  //�� ������ ó������ ª������ 2���� �κ��� ��Ƴ��´�
  let nextTwo = []
  for (let i = 0; i < info.length; i++) {
    if (info[i][1] === width || info[i][1] === height) {
      if (info[i + 1][1] === width || info[i + 1][1] === height) {
        //������ ����ó�� 50 160�� ���޾� ���� ���
        nextTwo.push(info[(i + 3) % 6][1], info[(i + 4) % 6][1])
      } else {
        nextTwo.push(info[(i + 2) % 6][1], info[(i + 3) % 6][1])
      }
      break
    }
  }

  let remove = 1
  for (let i = 0; i < nextTwo.length; i++) {
    remove *= nextTwo[i]
  }

  let result = K * (width * height - remove)
  console.log(result)

  process.exit()
})
