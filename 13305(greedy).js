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

  let N=data.shift()
  let distance=data.shift().split(' ').map(v => BigInt(v));
  let price=data.shift().split(' ').map(v => BigInt(v));

  let result=0
  let first=price[0]
  for(let i=0; i<distance.length; i++){
    result+=first*distance[i]
    if(price[i+1]<first){
      first=price[i+1]
    }
  }


  
  console.log(result)

  process.exit();
})


