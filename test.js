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

  let stack=[]

  let time=data.map(i=>i.split(' ').map(Number))

  time=time.sort((a,b)=>{
    if(a[0]===b[0]){
      return a[1]-b[1]
    }
    else{
      return a[0]-b[0]
    }
  })

  let count=1
  let result=[]
  for(let i=0; i<time.length; i++){
    let endTime=time[i][1]

    for(let j=i+1; j<time.length; j++){

      if(endTime>time[j][0]) {
        stack.push()
      }

      else if(endTime<=time[j][0]){
        result.push(count)
        count=1
        i=(j-1)
        break
      }

      if(j===(time.length-1)){
        result.push(count)
        i=(j-1)
      }
    }

    
  }

  console.log(Math.max(...result))




    process.exit()
})



