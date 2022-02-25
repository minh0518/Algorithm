const readline = require('readline')

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
})

const data = []

rl.on('line', (input) => {
   data.push(input)
}).on('close', () => {
   let num = data.shift().split('').map(Number)

   let result = num.reduce((a, b) => {
      if (a<=1 || b<=1) {
         return a + b
      } else {
         return a * b
      }
   })

   console.log(result)  //이 방법이 맞는 것인지는 확신이 서질 않는다

   // let num = data.shift().split('').map(Number)

   // let first = num.shift()

   // for (let i = 0; i < num.length; i++) {
   //    if (first <= 1 || num[i] <= 1) {
   //       first += num[i]
   //    } else {
   //       first *= num[i]
   //    }
   // }

   // console.log(first)

   process.exit()
})

