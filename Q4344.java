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

//�ϳ��� ����ϴ°� �ƴ϶� 
//������ ����� ���� �� ���س��� �װ� ���߿� �ѹ��� �� ����ؾ� �ϹǷ�
//�迭�� �ʿ��ϴ�. ���� �����س��� �װ� �ѹ��� ����ϴ� ���̴ϱ�.
