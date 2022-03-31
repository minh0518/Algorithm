const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

const check = (num) => {
  let result = []
  for (let i = 0; i < num.length; i++) {
    let tmp = num.shift()
    num.push(tmp)

    //result.push(Number(num.push(tmp).join('')))
    //join은 배열에다가 해야한다. 
		//하지만 push는 배열을 반환하지 않으므로 이렇게 동시에 사용하면 안 된다

    result.push(Number(num.join('')))
  }

  return Math.min(...result)
}

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let num = data.shift().split(' ').map(Number)

  let target = check(num)



  let compare=[]
  for (let i = 1111; i < 9999; i++) {
    

    if (('' + i).includes('0')) {
      continue
    }//0은 십자카드에 못 들어감


    let tmp = check(('' + i).split('').map(Number))
    //check함수엔 숫자배열이 들가므로, 숫자를 배열로 수정
    //(근데 차라리 함수안에서 바꿔주는 것이 더 나아보이기도 함)
    
    if (tmp < target) { //시계수보다 작은 경우

      //모든 수를 다 돌려보니 중복된 시계수들이 나오기 때문에
			//중복 제거
      if(!compare.includes(tmp)){
        compare.push(tmp)
      }
      
      
    }
  }

  console.log(compare.length+1)
  //몇번째에 있는 것인지 물어본 것이므로 앞에 있는 것들 +1



  process.exit()
})