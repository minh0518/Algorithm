const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  let N=+data.shift()

  let towers=data.shift().split(' ').map(Number)

  let stack=[]

  let answer=[]

  for(let i=0; i<N; i++){
    const currentTower = {
      index: i + 1,
      height: towers[i]
    }


    if(!stack.length){ //스택이 빈 것은 앞에 탑이 하나도 없는 것이므로
                      //스택에 현재 탑을 push하고 정답으로 0을 push
      stack.push(currentTower)
      answer.push(0)
      continue
    }

    if(stack[stack.length-1].height<currentTower.height){
        //스택의 맨 끝에 있는(=현재 탑과 가장 가까운곳에 있는 탑)탑의 높이보다
        //현재 탑이 더 높다면 레이저신호를 수신하지 못한다
        //그러므로 stack을 돌면서 찾아봐야한다

      while(stack.length){ //스택이 빌 때까지
        if(stack[stack.length-1].height>=currentTower.height){ 
                                    //stack을 돌면서
                                    //현재 입력받은 타워의 높이보다 큰 타워를 찾는다
          break //찾으면 바로break 즉, 더이상 스택에서 탐색하지 않음
        }
        else{
          stack.pop() //계속해서 스택을 탐색함
                    //여기서 현재 탑보다 낮은 값은 어차피 레이저가 수신되지 않으므로
                    //아예 스택에서 삭제시킨다
        }
      }

      //while문을 탈출했다면 stack이 빌 때까지 다 돌았거나, 
      //중간에 현재 타워보다 큰 값을 찾았다는 것이다
      if(!stack.length){ //stack이 빌 때까지 다 돌았을 경우
        answer.push(0) //정답으로 0 push
      }
      else{ //중간에 현재 타워보다 큰 값을 찾았을 경우
        answer.push(stack[stack.length - 1].index)
        //정답으로 스택에서 찾은 타워의 값 push
      }

      stack.push(currentTower)
      //현재 타워를 스택에 push
    }

    else{ //스택의 맨 끝에 있는(=현재 탑과 가장 가까운곳에 있는 탑)
          //탑의 높이가 현재 탑보다 더 높다면 그게 바로 정답이 되므로
      answer.push(stack[stack.length - 1].index)
      stack.push(currentTower)
      //그리고 스택에 현재 탑 push
    }
  }



  console.log(answer.join(' '))
  

  
  process.exit()
})

