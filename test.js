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
    let N=data
    let X=data[1].split(' ')  // 모험가들을 하나의 배열에다가 받음
    X=X.map(Number)     // 배열의 내용을 문자열에서 숫자로 변형
    X.sort((a,b)=>a-b)  // 오름차순 정렬

    let count=0         // 현재 그룹 안에 포함된 인원 수
    let group=0         // 결성된 그룹의 수
    for(let i of X){
      count++
      console.log(`i : ${i}`)
      if(i==count){     //현재의 공포도가 그룹안의 인원수 이하라면
        count=0
        group++
      }

    }

    console.log(group)

    process.exit();
})
// 1 2 2 2 2 3 3 4 
