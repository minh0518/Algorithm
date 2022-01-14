const { off } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const data=[]

rl.on('line', (input) => {
    data.push(input)  // 26 7  입력
 }).on('close',()=>{
  
  let count=0
  let target
  let n = +data[0].split(' ')[0];
  let k = +data[0].split(' ')[1];
   
  while(1){
     target=(parseInt(n/k))*k
     count+=(n-target)

     n=target

     if(n<k){
       break
     }

     
     n=parseInt(n/k)
     count++
  }
  
  count += (n-1)

  console.log(count)

    process.exit();
})


// 어떠한 수 N이 1이 될 때까지 다음의 두 과정 중 하나를 반복적으로 선택해야 합니다
// 단 , N이 K로 나우어 떨어질 때만 선택할 수 있습니다
// 1. N에서 1을 뺍니다
// 2. N에서 K로 나눕니다

// 예를들어 N이 17 K가 4 라고 가정합시다. 이때 1번 과정을 수행하면 N은 16이 됩니다
// 이후에 2번 과정을 2번 수행하면 N은 1이 됩니다.
// 이 경우 전체과정을 실행한 횟수는 3이 됩니다. 이는 N을 1로 만드는 최소 횟수입니다


// N과 K가 주어질 때, N이 1이 될 때까지 1번 혹은 2번 과정을 수행해야 하는 최소 횟수를
// 구하늘 프로그램을 작성하세요