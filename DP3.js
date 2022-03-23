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


    let [N,M]=data.shift().split(' ').map(Number)
    let price=data.map(Number)

    let D=new Array(M+1).fill(10001)

    D[0]=0

    for(let i=0; i<N; i++){ 
      for(let j=price[i]; j<=M; j++){ 
                                    
          if(D[j-price[i]]!==10001){
            D[j]=Math.min(D[j-price[i]]+1,D[j])
          }
      }
    }

    let result

    if(D[M]===10001){
      result=-1
    }
    else{
      result=D[M]
    }


    console.log(result)


  process.exit()
})

