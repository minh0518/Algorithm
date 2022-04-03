const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []


const check=(num)=>{

  let DP=new Array(num+1).fill(0)

  DP[1]=1
  DP[2]=1
  DP[3]=1
  DP[4]=2
  DP[5]=2


  for(let i=6; i<=num; i++){
    DP[i]=DP[i-5]+DP[i-1]
  }

  return DP

}

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  
  let T=data.shift()

  for(let i=0; i<T; i++){
    let N=Number(data.shift())

    let tmp=check(N)

    console.log(tmp[N])
  }
  

  process.exit()
})


//N��° �ﰢ���� �׷�����, �� �ﰢ���� �� ���� ����

//5�� ������ ������ ���� ������ ���Ѵ�


// ������ 2���� �� �� �����? x




//6��°�� 3��°
//7����� 2��°
//8��°�� 1��°



//9��°�� 4��°
//10��°��5��°

//11��°��6��°

//12��°�� 7��°

//13��°�� 8��°



//ó�� 3���� 1���� 3���� ����
//���� 2���� 2���� 2���� ����

//1 1 1  2 2  3 4 5 7 9 12