 class Q4673 {

	public static void main(String[] args) {
		boolean a[]=new boolean[10001];

//		for(int i=1; i<=10; i++) {
//			int sum=0;
//			sum=i;
//			while(i>0) {
//			sum+=i%10;
//			i/=10;
//			}
//			if(sum<=10) {
//			a[sum]=true;
//			}
//		}
		
		for(int i=1; i<=10000; i++) {
			a[calc(i)]=true;
		}
	
		for(int i=1; i<=10000; i++) {
			
			if(!(a[i])) {
				System.out.println(i);
			}
		}
	}
	
	
	static int calc(int a) {
		int sum=0;
		sum=a;
		while(a>0) {
		sum+=a%10;
		a/=10;
		}
		if(sum<=10000) {
		return sum;
		}
		else
		return 0;
		
		
	}
	
	

}
 
 
 
 
 
 
 
 
 
 
 
//import java.util.*;
//
//class Q4673{
//	public static void main(String args[]){
//		boolean check[]=new boolean[10001];//0~10000
//		for(int i=1; i<=10000; i++) {
//			check[calc(i)]=true;//true인게 생성자가 있는 수들을 체크해놓은것
//		}
//		for(int i=1; i<=10000; i++) {
//			if(!(check[i])) {
//				System.out.println(i);
//			}
//		}
//		
//		
//	}
//	static int calc(int a) {
//		int sum = 0;
//		sum=a;//이걸 밖에다 하는 이유는 반복문안에다가 해버리면 일의자리 숫자 더하고 십의자리
//				//더할려 오면 일의자리 더해진게 다시 초기화가 되어버리기 때문
//		
//		while(a>0) {//몇의지라 수가 올지 모를때 자릿수를 배열로 선언해서 자릿수를 넉넉하게 잡든
//					//아니면 다른 함수로 구현해서 그걸 구해내든,
//					//그 배열에다가 하나씩 넣는 방법이 있고
//					//이렇게 일반적올 while로 해서 그냥 그 수가 0이 될때까지 반복하는 방법이 있다
//					//무조건 2번째거 추천.첫번째것은 너무 비효울적임
//			sum+=a%10;
//			a/=10;
//		}
//		if(sum<=10000) {
//		return sum;
//		}
//		else
//			return 0; 
//	}
//}