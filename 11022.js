const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data=[]

rl.on('line', (input) => {
    data.push(input);
 });
rl.on('close',()=>{
  
  for (let i = 1; i <= Number(data[0]); i++) {
      let num1 = +data[i].split(' ')[0];
      let num2 = +data[i].split(' ')[1];

      console.log(`Case #${i}: ${num1} + ${num2} = ${num1 + num2}`);
  }

//   //배열구조분해를 사용할 수도 있습니다
//   for (let i = 1; i <= Number(data[0]); i++) {
//     let [num1,num2] = data[i].split(' ');
//     //배열구조분해 사용.

//     console.log(`Case #${i}: ${Number(num1)} + ${Number(num2)} = ${Number(num1) + Number(num2)}`);
//   }

  process.exit();
})