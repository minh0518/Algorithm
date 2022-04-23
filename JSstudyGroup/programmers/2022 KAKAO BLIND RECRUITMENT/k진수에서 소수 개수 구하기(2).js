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

    
    let num = n.toString(k) //k진수로 변환
    //211020101011

    let primes=num.split('0')
    let isPrimes = primes.filter(e => checkPrime(Number(e)));
    // console.log(primes)
    // console.log(isPrimes)

    return isPrimes.length

  }

  console.log(solution(437674, 3))