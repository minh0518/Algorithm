const { off } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const data=[]

rl.on('line', (input) => {
    data.push(input)  // 26 7  �Է�
 }).on('close',()=>{
  
  let count=0
  let target
  let n = +data[0].split(' ')[0];
  let k = +data[0].split(' ')[1];
   
  while(1){
     target=(parseInt(n/k))*k
     count+=(n-target)

     n=target

     if(n<k){
       break
     }

     
     n=parseInt(n/k)
     count++
  }
  
  count += (n-1)

  console.log(count)

    process.exit();
})