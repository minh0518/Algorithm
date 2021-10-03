const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data=[]
let score=[];
let max=0,sum=0;
rl.on('line', (input) => {
    data.push(input.split(' ').map(Number));
 });
rl.on('close',()=>{
    score=data[1]
    max=score[0];
  for(let i=0; i<score.length; i++){
    if(max<(score[i])){ // 만약 위에서 map(Number)로 숫자로 변환하지 않았다면
                    //여기서 숫자값을 문자열로써 비교하므로 논리적으로 오류가 발생합니다.
        max=score[i];
    }

  }

  for(let i=0; i<score.length; i++){
      score[i]=(score[i]/max)*100;  
      sum+=score[i];
  }


 console.log(sum/data[0]);

  process.exit();
})


//문자열이더라도 수학 연산을 하면 자동으로 숫자가 된다

//map(Number) 


//입력값에서  data=(input.split(' ').map(Number)); 와  
//data.push(input.split(' ').map(Number));의 차이


//전자의 경우는 data배열에다가 [10,20,30]를 넣는 것이므로 
// [10,20,30]가 되는 것이고(우리가 아는 일반적인 배열)
//후자는 data배열에다가 push해서 저 배열이 통째로 들어가므로 [ [10,20,30] ]이 됩니다
// 결국 [10 ,20 ,30]가 통째로 하나의 원소가 되는 것이죠

//첫번째 방법의 문제는
//3 
//10 20 30 
// 을 하면 [3]이 들어갔다가 [10,20,30]으로 값이 덮어씌워집니다.

//그래서 두번째 방법으로 하면
//[ [3] , [10,20,30]] 이 되지만 score=data[1]; 에서
//배열에 [10,20,30]을 넘겨주게 되어서
// score는 [10 ,20 ,30]이 됩니다. 정상적인 배열이죠.