import java.util.Scanner;
public class Q1065 {

	public static void main(String[] args) {
		Scanner a=new Scanner(System.in);
	
		int x=a.nextInt(),count=99;
		if(x<100) {
			System.out.println(x);
		}
		else {
		for(int i=100; i<=x; i++) {
			if(calc(i)) {
				count++;
			}
	
		}
		if(x==1000) {
			count--;
	}
		System.out.println(count);
		}
		
				
	}
	static boolean calc(int i) {
		int a,b,c;
		a=i%10;
		b=(i/10)%10;
		c=(i/100)%10;
		if(Math.abs(c-b)==Math.abs(b-a)) {
			
			return true;
		}
		else
			return false;
	}
	
	
}


//한자리 수와 두자리 수는 그냥 다 한수로 취급을 하는 것 같다


//1~9				0~9							0	

// 6 3 0 처럼 아예 한쪽으로 내려가는 그림은 가능하나
// 세모모형으로 
// 2 7 0 이런식으로 는 불가능하다
// 마지막의 차이는 0과 2번째 수를 비교하는 것인데
// 첫번째의 차이는 1부터 시작한 수를 2번째 수와 비교하는 것이므로
// 예를들어 0과 3이라하면 3의 차이다
//하지만 여기서 3의 차이를 내려면 무조건 0밖에 없다(삼각형의 모형이라면)
//그러므로 불가능하다
