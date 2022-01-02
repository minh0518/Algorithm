const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data=[]

rl.on('line', (input) => {
    data.push(input)
 }).on('close',()=>{ 
  
  let found=+data[0]
  let tmp=2
  let count=1
  let signal=true;
  if(found===1){
    console.log(1)
  }
  else{
    while(signal){
    for(let i=tmp; i<tmp+(6*count); i++){
      if(i===found){
        console.log(count+1)
        signal=false
        break;
      }
    }
    tmp=tmp+(6*count)
    count++;
  }
  
  }
  



  process.exit();
})


// 1
// 2~7     6
// 8~19    12 
// 20~37   18
// 38~61   24

