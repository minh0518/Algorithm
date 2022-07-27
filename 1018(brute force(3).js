const { count } = require('console')
const { off, mainModule } = require('process')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number)

  let board = data.map((i) => i.split(''))
  //���⼭ split()�� split('')�� ����

  let black = ['BWBWBWBW', 'WBWBWBWB']
  let white = ['WBWBWBWB', 'BWBWBWBW']

  let result=[]
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let countBlack = 0
      let countWhite = 0
      if (i + 8 <= N && j + 8 <= M) {
        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++) {
            if (board[i + x][j + y] !== black[x % 2][y]) {
              countBlack++
            }
            if (board[i + x][j + y] !== white[x % 2][y]) {
              countWhite++
            }
          }
        }
        result.push(Math.min(countBlack,countWhite))
        //�� ��ǥ�� �������� black���� ���� �� ���,white���� ���� �� ��츦
        //�� �� ���ؼ� �� �� �ּڰ��� push
      }
      
      //result.push(Math.min(countBlack,countWhite))
      //����� �ϸ� if�� �� �ɸ����� countBlack,countWhite�� 0���� ��� push�� �ȴ�
    }
  }

  console.log(Math.min(...result))


  process.exit()
})