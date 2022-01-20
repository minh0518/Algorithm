const { off } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const data=[]

rl.on('line', (input) => {
    data.push(input)  
 }).on('close',()=>{

    let N=data[0]
    let P=(data[1].split(' ')).map(Number)
    let total=0

    P.sort(function(a, b)  {
      return a - b;
    }); 

    for(let i=0; i<N; i++){
      for(let j=0; j<=i; j++){
        total+=P[j]
      }
    }

    console.log(total)

    process.exit();
})

