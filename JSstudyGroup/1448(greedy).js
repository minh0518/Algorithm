const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []


//���� ���ϴ� �Լ�
const check = (lines) => {
  for (let i = 0; i < lines.length - 2; i++) {
    if (lines[i]<lines[i + 1]+lines[i + 2]) {
      return(lines[i]+lines[i + 1]+lines[i + 2])
    }
//����ٰ� else�ؼ� -1�ϸ� �ȵ�
//�� ó�� 3���� ���� ���� �ȵǸ� �ٷ� -1�����ϴϱ�.
//���������̽� ���� 20 ���� ���� �͵鿡�� ����ϴ� ���� �� �� �ִ�
  }
}

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  data.shift()
  let lines =data.map((item) => Number(item))

  lines.sort((a, b) => { //�������� ����
    return b - a
  })
  
  let tmp = check(lines)

  console.log(tmp!==undefined ? tmp : -1)
  //�����ϰ� ���� �Ѿ���� �ʾҴٸ� undefined
  

  process.exit()
})
