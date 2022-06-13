const { off } = require('process')
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

  let numbers = data.map((item) => item.split(' ').map(Number))

  let tmp={}  

  for(let i=0; i<=20; i++){
    tmp[i]=[]
    for(let j=0; j<=20; j++){
      tmp[i][j]=[]
      for(let k=0; k<=20; k++){
        tmp[i][j][k]=null
      }
    }
  }


  const w=(a,b,c)=>{
    if(a<=0 || b<=0 ||c<=0){
      return 1
    }
    if(a>20||b>20||c>20){
      return w(20,20,20)
    }

    if(tmp[a][b][c]){
      return tmp[a][b][c]
    }



    //아래의 각 if/else에서 tmp[a][b][c]를 리턴해도 되고, 마지막에 
		//한번만 리턴해도 됨
    if(a<b && b<c){
      // tmp[a][b][c-1]=w(a, b, c-1)
      // tmp[a][b-1][c-1]=w(a, b-1, c-1)
      // tmp[a][b-1][c]=w(a, b-1, c)

      // tmp[a][b][c]=tmp[a][b][c-1]+tmp[a][b-1][c-1]+tmp[a][b-1][c]
      tmp[a][b][c]= w(a, b, c-1) + w(a, b-1, c-1) - w(a, b-1, c)
      //return tmp[a][b][c]
    }
    else{
      tmp[a][b][c]=w(a-1, b, c) + w(a-1, b-1, c) + w(a-1, b, c-1) - w(a-1, b-1, c-1)
    //  return tmp[a][b][c]
    }
    return tmp[a][b][c]

    
  }

  numbers.map(item=>{
    let [a,b,c]=item
    if(!(a==-1 && b==-1 && c==-1)){
      console.log(`w(${a}, ${b}, ${c}) = ${w(a,b,c)}`)  
    }
    
  })
  


  process.exit()
})