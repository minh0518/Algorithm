const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {


  let a=[1,2,3,4,5]

  a.map((i)=>{
    let tmp=[]

    if(i!==100){
      if(i+100>20){
        if(i===3){
          console.log('3')
        }
        else{
          console.log('3아님')
        }
      }
    }
  })

  
 
  process.exit()
})
