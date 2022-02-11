import java.util.Scanner;

class Q2562 {
	public static void main(String args[]) {
		
		Scanner a=new Scanner(System.in);
		int num,max=0,address=1;
		
		for(int i=1; i<=9; i++) {
			num=a.nextInt();
			if(max<num) {
				max=num;
				address=i;
			}
		}
		System.out.println(max);
		System.out.println(address);
	}
}
