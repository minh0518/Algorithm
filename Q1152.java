//import java.util.Scanner;
//
//public class Q1152 {
//
//	public static void main(String[] args) {
//		Scanner a=new Scanner(System.in);
//		String str=a.nextLine();
//		
//		String x[]=(str.trim()).split(" ");
//		System.out.println(x.length);
//	//trim은 문자열 앞뒤의 공백을 제거해 주는데 만약 문자열이 없고 그냥 공백 한칸(스페이스바)만 있으면
//	//문자열이 없으므로 그걸 맨 앞의 공백이라 인식을 안하고 지우지 않는다.
//	//근데 이런 과정 때문에 split에도 걸리지가 않는 것 같다. 그냥 trim을 통해서 나온 것이 하나의 문자로 인식을 해서. 
//	// 아마 그렇단 것이지 확실한 것은 아니다.
//		
//		String x2[]=str.split(" ");
//		System.out.println(x2.length);
//	//얘는 가차없이 차단
//		
//		
//	}
//
//}



//https://st-lab.tistory.com/65


import java.util.Scanner;

public class Q1152 {

	public static void main(String[] args) {
		Scanner a=new Scanner(System.in);
		String str=a.nextLine().trim();

		if(str.isEmpty()) {
			System.out.println(0);
		}
		else
			{String x[]=(str.split(" "));
			System.out.println(x.length);
			
			}
	}

}
