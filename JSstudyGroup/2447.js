const { time } = require('console')
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

  let result = []

  const printOrNot=(i,j,N)=>{
    if(i%3===1 &&j%3===1){
      result.push(' ')
    }
    else{
      if(N===1){
        result.push('*')
      }
      else{
        printOrNot(Math.floor(i/3),Math.floor(j/3),Math.floor(N/3))
      }
    }
  }

  

    for(let i=0; i<N; i++){
      for(let j=0;j<N; j++){
        printOrNot(i,j,N)
      }
      result.push('\n')
    }
  


  

  console.log(result.join(''))

  process.exit()
})
