function solution(s) {

    //���� ��ü�� ���� �ʰ�
    //�迭�� ���� ������ join�� ���� ���� words�迭�� �ε����� ����ص� ��
    let words = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    }

    
    for(let i in words){
      s=s.split(i).join(words[i])
    }

    return Number(s)
  }


  solution('one4seveneight')
