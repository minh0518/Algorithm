const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

const check=(num)=>{ //시계수 출력 
  let newInput=[num] //반드시 자기자신도 넣어야 함
  for(let i=1; i<=3; i++){
    newInput.push(num.slice(i)+num.slice(0,i))
  }
  return Number(Math.min(...newInput))
}

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  
  let num = data.shift().split(' ').join('')

  let result=[]
                
  for(let i=1111; i<check(num); i++){
    
    if( (!((i+'').includes('0'))) && (check(i+'')===i) ){
        result.push(check(i+''))
    }
  }

  console.log(result.length+1)
  


  process.exit()
})


