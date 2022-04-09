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
  let N = data.shift()

  let rect = data.map((item) => item.split(' ').map(Number))

  let width = Math.max(...rect.map((item) => item[0])) + 11
  let height = Math.max(...rect.map((item) => item[1])) + 11 
                                         

  let paper = new Array(height)
  for (let i = 0; i < height; i++) {
    paper[i] = new Array(width).fill(0)
  } //paper �� ���� 15+11 ���� 14+11�� 2���� �迭

  let check = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ]


  //�� �簢���� ��ǥ 1�� ǥ��
  for (let k = 0; k < rect.length; k++) { 
    for (let i = rect[k][1]; i < rect[k][1]+10; i++) {
											//��� �����̹Ƿ� ������ǥ ���� �־���� ��
      for (let j = rect[k][0]; j < rect[k][0]+10; j++) {
        paper[i][j]=1
      }
    }
  }


  //�̰� �ѷ� ���� Ȯ��
  let count=0
  for(let i=1; i<height; i++){//���⵵ ���������� ���� �������� 
    for(let j=1; j<width; j++){ //�� ������ Ȯ��
      if(paper[i][j]===1){
        for(let k=0; k<4; k++){  //�����¿� �迭 ����ϱ� ����
          let dx=i+check[0][k]
          let dy=j+check[1][k]
          if(paper[dx][dy]===0){
            count++
          }
        }
      }
    }
  }



  console.log(count)

  process.exit()
})