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

  let word=data[0]
  let check=['c=','c-','dz=','d-','lj','nj','s=','z=']
  

  for(let i=0; i<check.length; i++){
    word=word.split(check[i]).join('X')    
  }

  
  console.log(word.length)

  process.exit();
})