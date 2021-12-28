const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data;
let max=0;
rl.on('line', (input) => {
    data=input.toUpperCase();
 });
rl.on('close',()=>{
   let count=new Array(26).fill(0);

   console.log(data);
   for(let i=0; i<data.length; i++){
     count[((data[i].charCodeAt())-65)]++;
   }

  for(let i=0; i<count.length; i++){
     
    console.log(count[i]);
      
  }

  
//65부터 90
  process.exit();
})


//이전에도 필기했다시피  data=input 이렇게만 받아도 자동으로
//입력값은 문자열로 들어온다.



// data=input; 로 입력받으면 aaabc로 입력받아지고 (문자열)

// data=inupt.split(" "); 으로 입력받으면 ['aaabc']가 된다.




//극도로 민감한 사향이다.
//문자열은 []로 접근이 가능하다
//이게 문자열이 배열이라던가 객체라던가 이런게 아니라 (문자열은 프리미티브이다)
//그리고 JS에서 문자열은 객체가 아니라
//Javascript에서 문자열은 Array Like 형태로 참조할 수 있기 때문이다.


//그리고 String객체 (이건 원시값이랑 다른 진짜 말 그대로 new String 객체)
//의 메소드나 프로퍼티 (touppercase나 indexof같은 것들)를  ="" 같은
//문자열 리터럴로 선언한 원시값이 사용할 수 있는 것은 
//메소드나 프로퍼티를 사용하는 순간 래퍼객체가 일시적으로 생성이 되어서
//지원을 해 주고 실행이 되고 난 다음엔 래퍼객체가 사라지기 때문이다.


//new String 과 String은 다르다
//전자는 생성자를 사용한 '객체 생성'이고 후자는 단지 형변환의 기능만 수행한다
//그리고 JS튜토리얼에는 new String이라는 것 자체를 안쓴다
//왜냐하면 웬만하면 JS에는 문자열 리터럴을 통해 원시값으로 string을 사용해도
//그 new String이 제공하는 메소드나 프로퍼티를 다 사용할 수 있기 때문이다.
//다른 이유는 노션에 래퍼객체 필기한 것을 보자.


//    alert(?typeof?'hello'?);? // String
//alert(?typeof?new?String('hello')?);? //Object




//java에선 문자열자체가 다 객체가 되는 것으로 배워서 헷갈리지만
//(사실 java에서도 문자열 리터럴과 new String은 서로 저장되는 주소값은
//다르긴 합니다)
//jS에선 분명히 다릅니다.