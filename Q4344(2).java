//이건 오답이 아니라 4344번에서 각 케이스의 평균까지만 구한것인데 
//sum,ave변수를 각각 선언하는데 있어서 그 위치가 중요하기 때문에 따로 저장해둔 것이다


public static void main(String args[]){
	Scanner o=new Scanner(System.in);
	
	int case1=o.nextInt(),case2;
	int point;
	double ave[] =new double[case1];
	
	for(int i=0; i<case1; i++) {
		double sum=0;//sum변수는 무조건 밖에다가 하는게 아니라 여기다 선언해야 한다.
				//그렇지 않으면 이게 배열이 아니기 때문에 첫번째 케이스에서 더해졌던 그 값이
				//그대로 남아서 다음것에다가 더해지기 때문이다
		case2=o.nextInt();
		for(int j=0; j<case2; j++) {
			point=o.nextInt();
			sum+=point;
		}
		//ave=new double[case1];//처음 바로 ave를 선언했을때 크기를 정해주어도 되지만
							  //그냥 이렇게 하는 방법도 있다는걸 알기위해... 는 문법상 틀리진 않았지만
								//논리적으로는 오류다. 이렇게 해버리면 매번 for문이 돌때마다 ave의 크기가
								//새로 초기화가 되기떄문에 매번 값이 사라지고 결국 마지막 for문 돌때
								// 그 값만 다시 초기화가 되고 저장이 되기 때문에 마지막 값만 들어가고 이전값은
								//다 0이 되는 것이다
		ave[i]=sum/case2;
		}
	
	for(int i=0; i<case1; i++) {
	System.out.println(ave[i]);
		}
	}	
