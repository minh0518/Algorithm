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
		do {		//0을 넣으면 while조건문에 들어기가도 전에 바로 num==sum이 되어버려서
					//0이 출력이 된다. 그러므로 do while 써서 0을 넣어도 한번은 실행을 하게 만들었다.
			sum=(y*10)+((x+y)%10);
			x=sum/10;
			y=sum%10;
			count++;
		}while(num!=sum);
System.out.println(count);

	}

}
