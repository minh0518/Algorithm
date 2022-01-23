const { off } = require('process');
const readline = require('readline');
const { callbackify } = require('util');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data=[]

function sol(input) {
  const numbers = input.split("-").map((str) => 
    str.split("+")
       .map(Number)
       .reduce((s, v) => s + v, 0) 
  );
  let answer = numbers[0] * 2 - numbers.reduce((s, v) => s + v, 0); 
  return answer;
}

rl.on('line', (input) => {
    data.push(input)  
 }).on('close',()=>{

 
  console.log(sol(data.shift()))

  process.exit();
})