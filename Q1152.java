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
//	//trim�� ���ڿ� �յ��� ������ ������ �ִµ� ���� ���ڿ��� ���� �׳� ���� ��ĭ(�����̽���)�� ������
//	//���ڿ��� �����Ƿ� �װ� �� ���� �����̶� �ν��� ���ϰ� ������ �ʴ´�.
//	//�ٵ� �̷� ���� ������ split���� �ɸ����� �ʴ� �� ����. �׳� trim�� ���ؼ� ���� ���� �ϳ��� ���ڷ� �ν��� �ؼ�. 
//	// �Ƹ� �׷��� ������ Ȯ���� ���� �ƴϴ�.
//		
//		String x2[]=str.split(" ");
//		System.out.println(x2.length);
//	//��� �������� ����
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
