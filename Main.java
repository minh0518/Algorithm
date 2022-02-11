import java.util.*;

 class Main{
	public static void main(String args[]){
		Scanner o=new Scanner(System.in);
		int a=o.nextInt();
		for(int i=0; i<a; i++) {
			String word=o.next();
			System.out.println(word);
		}
		
	}
}




//65~90 >>26개 대문자
//97~122 >> 소문자

//word.charAt(i)-65 가 의미하는건 예를들어 word가 abc였다면 반복문 i를 통해 0인덱스인 <<문자>> a가 나오고
//두번째 1인덱스인 b 그리고 c가 차례로 나올텐데 여기서 65를 뺴주면 아즈키 코드상 이것들이 abc에서 012가 된다.

//adg 234
//036

//65에서 6번째 더 내려감 or 65번째에서 6칸 더 내려감 >>71 (그냥 6더하기만 하면 된다)