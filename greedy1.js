const { off } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const data=[]

rl.on('line', (input) => {
    data.push(input)    //1260 입력
 }).on('close',()=>{ 
    let N=Number(data[0])
  
    let count=0

    let arr=[500,100,50,10]

    for(let coin of arr){
      count+=parseInt(N/coin)
      N%=coin
    }

    console.log(count)
        

	process.exit();
})

// 당신은 음식점의 점원입니다 카운터에는 500 , 100 , 50 , 10 원짜리 동전이 무한히 존재하고
// 손님에게 거슬러 주어야 할 돈이 N원일 때 거슬러 주어야 할 동전의 최소 개수를 구하여라 



