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
    let X=data[1].split(' ')  
    X=X.map(Number)     
    X.sort((a,b)=>a-b)  

    let count=0         
    let group=0        
    for(let i of X){
      count++
      if(i==count){     // 오름차순으로 정렬을 했으므로
                        //‘현재의 공포도가 그룹안의 인원수 이하’라는 것이 가능할 수가 없다
                        //현재의 공포도가 그룹안의 인원수와 같아질 수는 있어도
                    // 공포도가 그룹안의 인원수보다 절대 작을 수는 없는 것이다.
        count=0
        group++
      }

    }

    console.log(group)

    process.exit();
})