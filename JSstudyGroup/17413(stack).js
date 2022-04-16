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
  let S = data.shift().split('')

  let stack=[]
  let isTag=false //반드시 처음에 false로 해야함
                    //그렇지 않으면 아래 로직상 
                    //일반 문자열로 시작하는 입력이 주어진 경우, 
                    //태그 안에 있는 내용으로 인식이 되어서 
                    //스택에 들어가고 pop되는 과정이 진행되지 않으므로
                    //문자열반전이 안 됨
  let result=[]

  for (let i of S) {
    if(i==='<'){
      isTag=true

      while(stack.length){ //태그 이전에 있는 문자열들이 있으면 죄다 출력
        result.push(stack.pop())
      }
      result.push(i) // '<'를 출력

    }
    else if(i==='>'){ 
      isTag=false
      result.push(i)  // '>'를 출력
    }
    else if(isTag){  //태그 안에 있는 내용들이면 그대로 출력
      result.push(i)
    }

    else{ //태그 안에 있는 것이 아닌 일반 문자열들

      if(i===' '){  //공백이면
        while(stack.length){  //공백 이전에 있던 것들 모두 출력
          result.push(stack.pop())
        }
        result.push(i) //공백을 출력
      }
      else{  //공백이 아닌 문자열이면
        stack.push(i)
      }

    }
  }

  //출력은 태그를 만나거나, 공백을 만나는 경우에만 됐었다
  //일반 문자열일 경우 계속해서 스택에 push만 해 주었다 (출력용인 result에 push가 아님)
  //그러므로 태그가 끝난 다음에 문자열이 있을 경우에 나머지 문자열들을 출력한다
  while(stack.length){  
    result.push(stack.pop())
  }


  console.log(result.join(''))

  


  process.exit()
})

