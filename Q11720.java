import java.util.Scanner;

class Q11720 {

	public static void main(String[] args) {
		Scanner a=new Scanner(System.in);
		int x=a.nextInt(),sum=0;
		//a.nextLine();
		String num=a.nextLine();
	
		
		for(int i=0; i<x; i++) {
			sum+=Integer.parseInt(num.substring(i,i+1));
			
		}
		
System.out.println(sum);
	}

}
