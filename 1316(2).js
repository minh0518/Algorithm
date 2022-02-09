const { stat } = require('fs')
const { off } = require('process')
const readline = require('readline')

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
})

const data = []

rl.on('line', (input) => {
   data.push(input)
}).on('close', () => {
   data.shift()

   let count = 0

   for (let word of data) {
      let letter = []
      let status = true
      letter = []
      for (let i = 0; i < word.length; i++) {
         if (!letter.includes(word[i])) {
            //indexOf대신 includes사용
            letter.push(word[i])
         } else {
            if (letter[letter.length - 1] !== word[i]) {
                //인덱스 비교 대신 문자데이터 비교
               status = false
            }
         }
      }

      if (status) {
         count++
      }
   }

   console.log(count)

   process.exit()
})
