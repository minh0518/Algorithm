const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  //출처 : https://velog.io/@silver_star/%EB%B0%B1%EC%A4%80-1105-%ED%8C%94-Greedy
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
      else if(L[i]!==R[i]){ //else로 하면 안되고 반드시 이 조건 필요
                            //1280 ,1281
                            //숫자가 틀리면 아예 끝인데
                            //같기라도 하면 끝까지 봐야 함
        break
      }


    }
  }


  console.log(result)



  



  
  process.exit()
})


  //8이 가장 적게 들어가있다는게 8 중에서가 아니라
  //8이 없는것도 치는것 같다

  //자리수가 다르면 무조건 8이 아닌 수가 들어가므로 x
  
  //자리수가 같으면 
  //한자리씩 비교해가며 8로 같으면++ 틀리면 바로 끝



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
//비교를 하다가 숫자가 다르면 분명 10이든 100이든  넘어가는 경우이므로 8이 안 들어감
