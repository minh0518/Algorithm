const { off } = require('process');
const readline = require('readline');
const { callbackify } = require('util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  data.shift()

  let info=data.map((item)=>(item.split(' ')).map(Number))
  let result=[]
  for(let i=0; i<info.length; i++){
    let count=1
    for(let j=0; j<info.length; j++){
      if(((info[i])[0]<(info[j])[0])&&((info[i])[1]<(info[j])[1])){
        count++
      }
    }
    result.push(count)
    
  }
  
  console.log(result.join(' '))


  process.exit();
});

