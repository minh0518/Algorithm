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

  let T= +data.shift()

  

  for (let i = 0; i <T; i++) {
    const floor = +data.shift()
    const num = +data.shift()
    const apartment = [];
 
  for (let i = 0; i <= floor; i++) {
    apartment.push([1]);
  for (let j = 1; j < num; j++) {
    if (i === 0) {
    apartment[i].push(j + 1);
    } 
    else {
    apartment[i].push(apartment[i][j - 1] + apartment[i - 1][j]);
    }
  }
}
 
console.log(apartment[floor][num-1]);
//floor는 0층부터여서 배열 인덱스와 동일하지만 num은 1호부터 시작이므로 배열 인덱스에 맞춰서 -1
}
  process.exit();
})