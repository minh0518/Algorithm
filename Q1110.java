import java.util.Scanner;

public class Q1110 {

	public static void main(String[] args) {
		Scanner a=new Scanner(System.in);
		int sum=0,num,x,y,count=0;
		num=a.nextInt();
		if(num<10) {
			num*=10;
		}
		x=num/10;
		y=num%10;
		do {		//0�� ������ while���ǹ��� ���Ⱑ�� ���� �ٷ� num==sum�� �Ǿ������
					//0�� ����� �ȴ�. �׷��Ƿ� do while �Ἥ 0�� �־ �ѹ��� ������ �ϰ� �������.
			sum=(y*10)+((x+y)%10);
			x=sum/10;
			y=sum%10;
			count++;
		}while(num!=sum);
System.out.println(count);

	}

}
