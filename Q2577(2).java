public static void main(String args[]){
    Scanner o=new Scanner(System.in);
    int num=1,i=0;
    int digit[]=new int[100];
//우선 여기서 내가 처음생각했던건 곱한 숫자의 값을 각 자리수로 잘라서 배열에 저장하고
//또 다른 배열에다가 각각의 자리수를 카운트하는 배열을 만들었다
//논리자체에선 틀린게 없지만 여기서 문제가 내가 배열을 arrayList를 사용해서
//동적할당 하지 않는이상(이 단원에선 아직 자료구조가 나오기전이라 안쓰는게 맞는것같다)
//미리 배열의 크기를 정해야 한다
//근데 내가 입력하는 수가 정해져 있는게 아니라 무슨 결과값이 나오는지 모르기 때문에
//저렇게 그냥 일단 넉넉하게 해놓자는 마인드로 100으로 설정했는데 배열 특성상 남은
//부분에 초기화를 해주지 않으면 다 0이 들어간다 그러므로 10320 이라는 숫자가 결과값이면
//0은 2개각 나와야하는데 103200000...00으로 이렇게 나머지 100의 자리수까지 다 0이 채워지기
//때문에 0의 갯수가 2가 안나오고 90몇개가 나오는 상황이 벌어지는 것이다
    int count[]=new int[9];
    for(int j=0; j<3; j++) {
    	num*=o.nextInt();
    }   
    while(num>0) {
	    digit[i]=num%10;
	    num/=10;
    	i++;    
    }
    //45678
    //digit=4 5 6 7 8
    for(int j=0; j<digit.length; j++) {
    	for(int k=0; k<10; k++) {
		    if(digit[j]==k) {
			    count[k]+=1;
		    }
	    }
    }
    for(int j=0; j<count.length; j++)
    System.out.println(count[j]);
    }