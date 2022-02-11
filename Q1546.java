import java.util.Scanner;

class Q1546 {

	public static void main(String[] args) {
		Scanner a=new Scanner(System.in);
		double max=0,temp = 0;
		int n=a.nextInt();
		double score[]=new double[n];
		for(int i=0; i<score.length; i++) {
			score[i]=a.nextDouble();
			if(max<score[i]) {
				max=score[i];
			}
		}
		for(int i=0; i<score.length; i++) {
			temp+=(score[i]/max)*100;	
		}
		System.out.println(temp/score.length);
		
	}

}

//과정을 출력해 버린다