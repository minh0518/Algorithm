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

  let result=Number((data[0])[0])  
//첫번째 수 가져옴

  let num=data[0] //전체 숫자를 문자열로 가져옴
  for(let i=1; i<data[0].length; i++){
    if((Number(num[i])<=1 || result<=1 )){ 
        result+=Number(num[i])
    }
    else{
      result*=Number(num[i])
    }
  }
  console.log(result)
  
    process.exit();
})


// 각 자리 숫자(0~9)로만 이뤄진 문자열 s가 주어졌을 때,
// 왼쪽부터 오른쪽으로 하나씩 모든 숫자를 확인하면서 숫자 사이에 * 혹은 + 연산지를
// 넣어서 결과적으로 만들어질 수 있는 가장 큰 수를 구하는 프로그램을 작성해라.
// 단, + 보다 * 를 먼저 계산하는 일반적인 방식과는 달리, 모든 연산은 왼쪽에서부터
// 순서대로 이뤄진다.

// 예를들어 02984라는 문자열로 만들 수 있는 가장 큰 수는 
// ((((0+2)*9)*8)*4) = 576  입니다.
// 또한 만들어질 수 있는 가장 큰 함수는 항상 20억 이하의 정수가 되도록 입력이
// 주어집니다(모든 언어의 기본 int형이 약 21억까지 표현이 가능하므로)