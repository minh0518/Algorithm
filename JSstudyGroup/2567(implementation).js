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
  } //paper 는 가로 15+11 세로 14+11의 2차원 배열

  let check = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ]


  //각 사각형들 좌표 1로 표시
  for (let k = 0; k < rect.length; k++) { 
    for (let i = rect[k][1]; i < rect[k][1]+10; i++) {
											//행렬 개념이므로 세로좌표 먼저 넣어줘야 함
      for (let j = rect[k][0]; j < rect[k][0]+10; j++) {
        paper[i][j]=1
      }
    }
  }


  //이게 둘레 인지 확인
  let count=0
  for(let i=1; i<height; i++){//여기도 마찬가지로 행을 기준으로 
    for(let j=1; j<width; j++){ //각 열들을 확인
      if(paper[i][j]===1){
        for(let k=0; k<4; k++){  //상하좌우 배열 사용하기 위해
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