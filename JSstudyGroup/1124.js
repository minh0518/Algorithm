const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

const check=(target)=>{ //소인수분해를 구하고 그 갯수를 리턴
  let result = []
  let i = 2

  while (1) {
    if (target % i === 0) {
      result.push(i)
      target = target / i
    }
    else{
      i++
    }
    
    if (target===1) {
      break
    }
  }

  return result.length
}

const isPrime = (num) => { //에라스토테네스의 체를 이용한 소수판별
  let arr = new Array(num + 1).fill(true).fill(false, 0, 2)

  for (let i = 2; i * i <= num; i++) {  
    if (arr[i]) {
      for (let j = i * i; j <= num; j += i) {
        arr[j] = false
      }
    }
  }

  return arr[num]
}




rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [A,B]=data.shift().split(' ').map(Number)

  let count=0
  for(let i=A; i<=B; i++){
    if(isPrime(check(i))){
      count++
    }
  }
 
  console.log(count)
  process.exit()
})
