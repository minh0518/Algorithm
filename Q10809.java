import java.util.Scanner;

class Q10809 {

	public static void main(String[] args) {
		Scanner a=new Scanner(System.in);
		String word=a.nextLine();
		int arr[]=new int[26];
		
		for(int i=0; i<26; i++) {
			arr[i]=word.indexOf((char)(i+97));
		}
		for(int i=0; i<26; i++) {
			System.out.print(arr[i]+" ");
		}
	}

}
