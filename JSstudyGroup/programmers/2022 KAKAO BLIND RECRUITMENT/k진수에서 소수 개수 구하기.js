function solution(n, k) {
    

    function checkPrime(num){ 
      if(!num || num===1) {
        return false
      }
      for(let i = 2 ; i <= Math.sqrt(num) ; i++){ 
        if(num % i == 0) {
          return false
        }
      } 
      return true
    }

    // //에라스토테네스의 체로 소수 판별
    // const checkPrime = (num) => {
    //   let arr = new Array(num + 1).fill(true).fill(false, 0, 2)

    //   for (let i = 2; i * i <= num; i++) {
    //     if (arr[i]) {
    //       for (let j = i * i; j <= num; j += i) {
    //         arr[j] = false
    //       }
    //     }
    //   }
    //   return arr[num]
    // }

    let num = n.toString(k) //k진수로 변환
    //211020101011

    let result = []

    
    //P
    if(!num.includes('0')){
      result.push(num)
    }
    else{
    //P0
    for(let i=0; i<num.length; i++){
      if(num[i]==='0'){
     //   console.log(num.slice(0,i))
        result.push(num.slice(0,i))
      }
    }

    //0P
    for(let i=num.length-1; i>=0; i--){
      if(num[i-1]==='0'){
      //  console.log(num.slice(i,num.length))
        result.push(num.slice(i,num.length))
      }
    }



    //0P0
    for (let i = 0; i < num.length; i++) {
      for (let j = i + 1; j < num.length; j++) {
        if (num[i] === '0' && num[j] === '0') {
          //양 쪽에 0이 있으면 그 사이에 있는것을 slice함

          //console.log(`&& ${num.slice(i+1, j)}`)  
          result.push(num.slice(i+1, j))
        }
      }
    }


  }
    
    //console.log(result)
    
    
    let final=[]
    result.map(item=>{
      if(!(item.includes('0'))){
        if(checkPrime(Number(item))){
          final.push(item)
        }
      }
    })
    //console.log(final)

    //console.log(final.length)



    return final.length

  }

  console.log(solution(437674, 3))