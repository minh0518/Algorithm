//백준에서 해당 번호로 문제를 검색하고자 할 때 몇 페이지에 있는지
//확인하는 간단한 코드입니다



const { off } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
})

const data = []

rl.on('line', (input) => {
   data.push(input)
}).on('close', () => {
    
   // // 부루트 포스로 모든 찾을 때까지 것을 돌아가며 탐색

   //    let num=data.shift()
   //    let page=1
   //    let find=1000
   //    while(1){
   //       if(num>=find&&num<=(find+99)){
   //          break
   //       }
   //       find+=100
   //       page++
   //    }

   //    console.log(`${num}번 문제는 ${page}페이지에 있습니다`)

   // 탐색보다 보다 간편한 공식을 통해 검색
   let num = data.shift()

   let page = parseInt(num / 100) - 9

   console.log(`${num}번 문제는 ${page}페이지에 있습니다`)

   process.exit()
})
