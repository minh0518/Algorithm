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

    
   
  
  //�� ���⼭ parseInt���� Number�� �ȵǴ��� �𸣰ڴ�. �������� ã�ƺ���
  //let data=Array(10001).fill(false); ���� Array�ȿ� �ִ� ���� �迭��
  //�����ε� 100�����ϸ� 0~99�����̹Ƿ� �� ���������� 10000���� �˻縦 
  //�ؼ� 10001���� ���� �־�����ϴ�.
  //�� ����ó�� �Է��� ���� ������ node.js������ �Ϲ� js���Ϸ� �����մϴ�
  //js�� �ַܼ� �ϴ� �Է��� �������� ����� �ܼ������ �����ϱ� �����Դϴ�(console.log)