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

  let N = +data.shift()

  let location = data.map((i) => i.split(' ').map(Number))

  let width=Math.max(...data.map(i=>Number(i.split(' ')[0])))+10
  let height=Math.max(...data.map(i=>Number(i.split(' ')[1])))+10
  
  let paper = new Array(height+1).fill().map(() => new Array(width+1).fill(0))

  let cord = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ]
  let result=0

  const check=(x,y)=>{

  
    for(let i=0; i<4; i++){
      if(paper[x+cord[0][i]][y+cord[1][i]]===0) {
        result++
      }

    }


  }

  
  //저기서 location의 =가 뭔 차이
//이게 7~17까지 정확히 따지는게 아니라
//하나의 블록 형태로 따지므로 정확히 10개인 것으로 생각해야 한다
//노션에 링크 걸어놓은 사진을 보면 이해가 간다
//좌표를 딱 맞추는 것이 아니라 갯수가 10개여야 한다
  for(let i=0; i<N; i++){
    for(let j=location[i][1]; j<location[i][1]+10; j++){
      for(let k=location[i][0]; k<location[i][0]+10; k++){
          paper[j][k]=1
      }
    }
  }

  //console.log(paper)


  //1
  for(let i=1; i<height; i++){
    for(let j=1; j<width; j++){
      if(paper[i][j]!==1) continue

      check(i,j)

    }
  }


  console.log(result)

  for(let i=3; i<3+10; i++){
    console.log(i)
  }
  //3부터 12까지인데 횟수는 10이 맞음 > 노션에 필기

  process.exit()
})
