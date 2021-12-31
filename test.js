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
  
  let A=+(data[0].split(' '))[0]
  let B=+(data[0].split(' '))[1]
  let C=+(data[0].split(' '))[2]
  
  let point=0

  point=Math.floor((A/(C-B)))+1

  B>=C ? (point=-1):point
 
  console.log(point)
  
  
  

  process.exit();
})