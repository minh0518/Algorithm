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

//   //�迭�������ظ� ����� ���� �ֽ��ϴ�
//   for (let i = 1; i <= Number(data[0]); i++) {
//     let [num1,num2] = data[i].split(' ');
//     //�迭�������� ���.

//     console.log(`Case #${i}: ${Number(num1)} + ${Number(num2)} = ${Number(num1) + Number(num2)}`);
//   }

  process.exit();
})