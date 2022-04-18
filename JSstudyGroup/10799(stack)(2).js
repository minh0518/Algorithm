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
 
  let text=data.shift().split('')

  let stack=[]

  let result=0


  for(let i=0; i<text.length; i++){
    if(text[i]==='('){

      if(text[i+1]===')'){
        result+=stack.length
        i++ //아래 continue가 되면 해당 루프를 끝내고 바로 다음 루프로
            //넘어가는데 이 과정에서 (for문의 3번째 조건)i++가 한번더 되므로
            //+2가 아니라 +1을 해야 한다
        continue
      }
      else{
        result++
        stack.push('(')
      }
    }

    else{ //')'일때
      stack.pop()
    }

  }

  console.log(result)
  
  process.exit()
})

//기본 ( 생성이 되면 갯수에 + , 그리고 스택에 갯수를 담아 둠
// ()로 짤리면 스택의 갯수 +
// )로 닫히면 스택에서 -1 (실제 갯수에서 -1이 아님)