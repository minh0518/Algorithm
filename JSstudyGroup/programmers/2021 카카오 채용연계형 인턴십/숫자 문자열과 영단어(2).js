function solution(s) {

    //굳이 객체로 하지 않고
    //배열로 만든 다음에 join에 넣을 값을 words배열의 인덱스로 사용해도 됨
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
