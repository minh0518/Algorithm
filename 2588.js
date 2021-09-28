const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data=[];
let count=0;
let num1,num2,result;

rl.on('line', (input) => {
  data.push(input);
  count++;


     if(count==2){  //2개를 다 받고 시작

      num1=parseInt(data[0]);
      num2=parseInt(data[1]);
      result=parseInt(num1*num2);
		//맨 마지막 결과값을 가져오기 위해 미리 계산 후, 받아둠

      while(num2>0){
      console.log(num1*(num2%10))  //첫번째 값과 두번째 값의 
													//마지막 자리수를 곱한다

      num2=parseInt(num2/10); // num2 맨 마지막 자리수를 제거한다.
	
													//10으로 나눈 다음 Math클래스의 메소드를 사용해
                          //소수점을 없앨 수도 있지만 그냥 Int로 형변환해서
                          //없앴다
     }
     console.log(result);
       rl.close();
     }  
 });