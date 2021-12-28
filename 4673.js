let a,num,result,count=0;
let data=Array(10001).fill(false);

  function cal(n){
      result=n;  
      while(n){
        result+=(n%10)
        n=parseInt(n/10);
      }
      return result;
     }


     for(let i=1; i<=10000; i++){
              data[cal(i)]=true;
     }
     for(let i=1; i<=10000; i++){
        if(data[i]==false){
          console.log(i);
        }
    }

    
   
  
  //왜 저기서 parseInt말고 Number가 안되는지 모르겠다. 차이점을 찾아보자
  //let data=Array(10001).fill(false); 에서 Array안에 있는 것은 배열의
  //길이인데 100까지하면 0~99까지이므로 이 문제에서는 10000까지 검사를 
  //해서 10001까지 값을 넣어줬습니다.
  //이 문제처럼 입력이 없는 문제는 node.js모듈없이 일반 js파일로 진행합니다
  //js는 콘솔로 하는 입력이 문제였지 출력은 콘솔출력이 가능하기 때문입니다(console.log)