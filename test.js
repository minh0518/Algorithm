const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  //��ó : https://velog.io/@silver_star/%EB%B0%B1%EC%A4%80-1105-%ED%8C%94-Greedy
  // https://dlwnsdud205.tistory.com/18
  // https://kjs-dev.tistory.com/entry/%EB%B0%B1%EC%A4%80-%EC%9E%90%EB%B0%94-1105-%ED%8C%94

  let [L,R]=data.shift().split(' ')

  L=L.split('').map(Number)
  R=R.split('').map(Number)


  let result=0

  if(L.length!==R.length){
    result=0
  }
  else{
    for(let i=0; i<L.length; i++){

      if((L[i]===8 && R[i]===8) ){
        result++
      }
      else if(L[i]!==R[i]){ //else�� �ϸ� �ȵǰ� �ݵ�� �� ���� �ʿ�
                            //1280 ,1281
                            //���ڰ� Ʋ���� �ƿ� ���ε�
                            //����� �ϸ� ������ ���� ��
        break
      }


    }
  }


  console.log(result)



  



  
  process.exit()
})


  //8�� ���� ���� ���ִٴ°� 8 �߿����� �ƴ϶�
  //8�� ���°͵� ġ�°� ����

  //�ڸ����� �ٸ��� ������ 8�� �ƴ� ���� ���Ƿ� x
  
  //�ڸ����� ������ 
  //���ڸ��� ���ذ��� 8�� ������++ Ʋ���� �ٷ� ��



//8181
//8189

//812
//821

//888
//898

//8
//81

//111
//121
//�񱳸� �ϴٰ� ���ڰ� �ٸ��� �и� 10�̵� 100�̵�  �Ѿ�� ����̹Ƿ� 8�� �� ��
