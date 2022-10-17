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
  let idx=0
  let rseult=[]

  let locations = data.shift().split(' ').map(Number)
  let index=new Array(N).fill().map((_,i)=>i+1)


  

  let temp=locations[idx]
  locations.splice(idx,1)


  rseult.push(index[idx])
  index.splice(idx,1)



  while(locations.length){
    if(temp<0){
      idx=Math.abs(idx+temp)%(locations.length)
    }
    else{
      idx=(idx+(temp-1))%(locations.length)
    }

    temp=locations[idx]
    locations.splice(idx,1)

    rseult.push(index[idx])
    index.splice(idx,1)

  }
  

  console.log(rseult)






  process.exit()
})

