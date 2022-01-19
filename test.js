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

    // readme파일 생성과 관련된 커밋충돌 유무 확인용


    process.exit();
})

