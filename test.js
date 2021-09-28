const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


let original,num,one,result=0;
let count=0;

rl.on('line', (input) => {

  original=input;
    
 });
rl.on('close',()=>{
  if(original<10){
    original*=10;
  }
  if(original==0){
    console.log(1);

  process.exit();
  }

   while(original!=result){

     if(count==0){
    result=original; 
    //처음 시작할 때 연산을 수행할 값을 가져야 하니까 시작할때만 
    //result에다 넘겨준다
     }

  one=((result%10)+(parseInt(result/10)))%10
  //새로운 수를 만들때 사용되는 두번째 자리수
  //68일 경우 6+8은 14이므로 4만 가져와야 하므로 마지막에 %10 사용

  result=parseInt((result%10)+''+(one))
  //새로운 수 생성. 첫번째 자리수는 바로 계산해서 작성
  
  

  count++;
  
  }
  
console.log(count);

  process.exit();
})


