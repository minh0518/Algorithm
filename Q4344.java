import java.util.Scanner;

class Q4344{
	public static void main(String args[]){
	Scanner a=new Scanner(System.in);
		
	int c=a.nextInt();
	double result[]=new double[c];
	
	for(int i=0; i<c; i++) {
		
		int num=a.nextInt();
		int score[]=new int[num];
		double sum=0;
		double ave=0;
		int count=0;
		
		for(int j=0; j<num; j++) {
			score[j]=a.nextInt();
			sum+=score[j];
			ave=sum/num;
		}
	
		
		for(int j=0; j<num; j++) {
			if(score[j]>ave) {
				count++;
			}		
		}
		result[i]=(count/(double)num)*100;
		
	}
	for(int i=0; i<c; i++) {
		System.out.println(String.format("%.3f",result[i])+"%");
	}
		}
	}

//하나씩 출력하는게 아니라 
//각각의 경우의 값을 다 구해놓고 그걸 나중에 한번에 다 출력해야 하므로
//배열이 필요하다. 값을 저장해놓고 그걸 한번에 출력하는 것이니까.
