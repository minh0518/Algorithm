import java.util.*;

class Q2577{
	public static void main(String args[]) {
		Scanner a=new Scanner(System.in);
		int sum=17037300;
		int[] count=new int[10];
//		for(int i=0; i<3; i++) {
//			sum*=a.nextInt();
//		}
	while(sum!=0) {
			count[sum%10]++;
			sum/=10;
		}
	for(int i=0; i<10; i++) {
		System.out.println(count[i]);
	}
	}
}


