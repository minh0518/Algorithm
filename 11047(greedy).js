const { off } = require('process');
const readline = require('readline');
const { callbackify } = require('util');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data=[]

rl.on('line', (input) => {
    data.push(input)  
 }).on('close',()=>{

  let [N,K]=data.shift().split(' ').map(Number)

  let value=data.map(Number)


  let result=0

  for(let i=(N-1); i>=0; i--){
    if(K===0){
      break
    }
    if(value[i]<=K){
    result+=parseInt(K/value[i])
    K%=value[i]
    }
  }

  console.log(result)
  
  


  process.exit();
})


