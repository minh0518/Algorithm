 class Q4673 {

	public static void main(String[] args) {
		boolean a[]=new boolean[10001];

//		for(int i=1; i<=10; i++) {
//			int sum=0;
//			sum=i;
//			while(i>0) {
//			sum+=i%10;
//			i/=10;
//			}
//			if(sum<=10) {
//			a[sum]=true;
//			}
//		}
		
		for(int i=1; i<=10000; i++) {
			a[calc(i)]=true;
		}
	
		for(int i=1; i<=10000; i++) {
			
			if(!(a[i])) {
				System.out.println(i);
			}
		}
	}
	
	
	static int calc(int a) {
		int sum=0;
		sum=a;
		while(a>0) {
		sum+=a%10;
		a/=10;
		}
		if(sum<=10000) {
		return sum;
		}
		else
		return 0;
		
		
	}
	
	

}
 
 
 
 
 
 
 
 
 
 
 
//import java.util.*;
//
//class Q4673{
//	public static void main(String args[]){
//		boolean check[]=new boolean[10001];//0~10000
//		for(int i=1; i<=10000; i++) {
//			check[calc(i)]=true;//true�ΰ� �����ڰ� �ִ� ������ üũ�س�����
//		}
//		for(int i=1; i<=10000; i++) {
//			if(!(check[i])) {
//				System.out.println(i);
//			}
//		}
//		
//		
//	}
//	static int calc(int a) {
//		int sum = 0;
//		sum=a;//�̰� �ۿ��� �ϴ� ������ �ݺ����ȿ��ٰ� �ع����� �����ڸ� ���� ���ϰ� �����ڸ�
//				//���ҷ� ���� �����ڸ� �������� �ٽ� �ʱ�ȭ�� �Ǿ������ ����
//		
//		while(a>0) {//�������� ���� ���� �𸦶� �ڸ����� �迭�� �����ؼ� �ڸ����� �˳��ϰ� ���
//					//�ƴϸ� �ٸ� �Լ��� �����ؼ� �װ� ���س���,
//					//�� �迭���ٰ� �ϳ��� �ִ� ����� �ְ�
//					//�̷��� �Ϲ����� while�� �ؼ� �׳� �� ���� 0�� �ɶ����� �ݺ��ϴ� ����� �ִ�
//					//������ 2��°�� ��õ.ù��°���� �ʹ� ��ȿ������
//			sum+=a%10;
//			a/=10;
//		}
//		if(sum<=10000) {
//		return sum;
//		}
//		else
//			return 0; 
//	}
//}