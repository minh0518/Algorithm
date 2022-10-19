const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  
  
  if('truthy는 과연 true일까?'){
    console.log('truthy는 조건문에서 true 처럼 작동하긴 하지만')
  }

  console.log(true===1)//false 
                      //truthy는 true 자체는 아니다
                      

  console.log(true==1)//true 
                      //물론 ==를 쓰면 형변환을 자동으로 해서
                      //1은 true가 되지만 (0은 false)

  console.log(true==43)//false
                      //형변환을 한다 해서 모든 truthy가 
                      //true가 되는것은 아니다
                      


  console.log(false==0) //true
                        //형변환하면 falsy의 0은 false가 됨
  
  


  
  
 
  process.exit()
})
