const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let T = data.shift()

  for (let i = 0; i < T; i++) {
    let [N, M] = data.shift().split(' ').map(Number)
    let tmp = data.shift().split(' ').map(Number)
    let gold = []

    for (let i = 0; i < N; i++) {
      gold.push([])
      for (let j = 0; j < M; j++) {
        gold[i].push(tmp.shift())
      }
    } //�̷��� �ص� �Ǵµ� slice�� Ȱ���غ���

    //gold�� �� ����ǥ�� �� ���� �ǹ�
    let DP = new Array(N)
    for (let i = 0; i < N; i++) {
      DP[i] = new Array(M).fill(0)
    }

    for (let i = 0; i < N; i++) {
      //�ʱ갪
      DP[i][0] = gold[i][0]
    }

 
    for (let i = 1; i < M; i++) { //���� 1����. ���� �������� �� �ప���� ��
      for (let j = 0; j < N; j++) { //���� 0����
        let leftup = 0
        let leftdown = 0
        let left = 0

        //���� ������ ã���ָ� ��
        if (j === 0) {
          leftup = 0
        } else {
          leftup = DP[j - 1][i - 1]
        }

        if (j === N - 1) {
          leftdown = 0
        } else {
          leftdown = DP[j + 1][i - 1]
        }

        left = DP[j][i - 1]

        DP[j][i] = gold[j][i] + Math.max(leftup, leftdown, left)
      }
    }

    let result = []
    for (let i = 0; i < N; i++) {
      result.push(DP[i][M - 1])
    }

    console.log(Math.max(...result))
    //console.log(DP)
  }

  process.exit()
})