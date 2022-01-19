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
    let N=8
    let rows=Number((data[0])[1]) //숫자, 행
    let cols=((data[0]).charCodeAt(0))-96 //문자 , 열
    let next_rows
    let next_cols
    let count=0

    let move=[[-1,-2],[-2,-1],[-1,2],[-2,1],[1,-2],[2,-1],[1,2],[2,1]]
    //이 문제는 첫번째 문제처럼 이동명령을 받은 것이 아니기 때문에
    //굳이 문자열로 이루어진 명령 커맨드를 따로 작성해줄 필요 없다

    for(let i of move){
      next_rows=rows+i[0]
      next_cols=cols+i[1]

      if((next_rows>=1&&next_rows<=N) && (next_cols>=1&&next_cols<=N)){
        count++
      }
    }

    console.log(count)

    process.exit();
})

