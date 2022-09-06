const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {


  let K=+data.shift()
  let info=data.map(i=>i.split(' ').map(Number))

  // let big=info.sort((a,b)=>{
  //   return b[1]-a[1]
  // })[0][1]

  // let small=info.sort((a,b)=>{
  //   return a[1]-b[1]
  // })[0][1]
  
  // console.log(big,small)





  //가로들 ,세로들 모아놓고 최대값인 것들 추출
  let width=info.filter(i=>{
    return i[0]===1||i[0]===2
  })

  let height=info.filter(i=>{
    return i[0]===3||i[0]===4
  })
  width=width.sort((a,b)=>{
    return b[1]-a[1]
  })[0][1]
  height=height.sort((a,b)=>{
    return b[1]-a[1]
  })[0][1]



  //긴 변에서 처음으로 짧아지는 2개의 부분은 살아남는다
  let nextTwo=[]
  for(let i=0; i<info.length; i++){
    if(info[i][1]===width||info[i][1]===height){
      if(info[i+1][1]===width||info[i+1][1]===height){
        //문제의 예제처럼 50 160이 연달아 나올 경우
        // nextTwo.push(info[i+2])
        // nextTwo.push(info[i+3])
        nextTwo.push(info[(i+3)%6][1],info[(i+4)%6][1])
        
      }
      else{
        // nextTwo.push(info[i+1])
        // nextTwo.push(info[i+2])
        nextTwo.push(info[(i+2)%6][1],info[(i+3)%6][1])
        
      }
      break
    }
  }

  let remove=1
  for(let i=0; i<nextTwo.length; i++){
    remove*=nextTwo[i]
  }
  
  let result=K*((width*height)-remove)
  console.log(result)



  
  

//  console.log(nextTwo)



  //1과2
  //3과4
  //아 같은 방향끼리 더해주면될듯
 
  process.exit()
})


  //위로갔다가 아래로 가거나
  //오른쪽으로 갔다가 왼쪽으로 가거나
  //를 생각해보니 그냥 한단계 건너뛰면 되는구나

  //그리고 두번째하고 


  //시작이 까이면 시작 전과 곱하기
  //시작인 안 까이면 까인 것 다음과 곱하기

//1일땐 2
//2일땐 1

//3일떈 4
//4일땐 3




//전체에서 차라리 일부를 빼는 게 나은 것 같다