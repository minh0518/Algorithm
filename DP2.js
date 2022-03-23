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

  let X=Number(data.shift())

  let D=new Array(X+1).fill(0)

  D[1]=0
  D[2]=1
  

  for(let i=3; i<=X; i++){
      D[i]=D[i-1]+1

      if(i%3===0){
        D[i]=Math.min(D[i],D[i/3]+1)
      }
      if(i%5===0){
        D[i]=Math.min(D[i],D[i/5]+1)
      }


  }
  console.log(D[X])

  process.exit()
})