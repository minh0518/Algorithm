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
    let plans=data[1].split(' ')
    let [x,y]=[1,1]
    let [dx,dy]=[[0,0,-1,1],[-1,1,0,0]]
//dx [0,0,-1,1]
//dy [-1,1,0,0]
    let [nx,ny]=[0,0]  //이동된 좌표를 담는 곳입니다

    command=['L','R','U','D']

    for(let i=0; i<plans.length; i++){
      
      for(let j=0; j<command.length; j++){
        if(plans[i]===command[j]){
          nx=x+dx[j]
          ny=y+dy[j]
        }
      }
      if(nx<1||ny<1||nx>N||ny>N){
        continue;
      }
      [x,y]=[nx,ny]
    }

    console.log(x,y)

    process.exit();
})


//문제 : 상화좌우 (노션에서 확인)