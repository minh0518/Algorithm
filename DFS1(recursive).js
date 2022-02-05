const { off } = require('process')
const readline = require('readline')
const { callbackify } = require('util')

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
})

const data = []

rl.on('line', (input) => {
   data.push(input)
}).on('close', () => {
    
   const dfs = (a, b) => {
      if (a <= -1 || a >= N || b <= -1 || b >= M) {
         return false
      }

      if (graph[a][b] == 0) {
         graph[a][b] = 1
         dfs(a - 1, b) //상
         dfs(a + 1, b) //하
         dfs(a, b - 1) //좌
         dfs(a, b + 1) //우
         return true
      } else {
         return false
      }
   }

   let [N, M] = data.shift().split(' ').map(Number)
   //N이 rols , M이 cols
   let graph = []

   graph = data.map((item) => {
      return item.split('').map(Number)
   })

   result = 0
   //3x3이면 N,M도 3이 들어감.
   //실제 배열인덱스는 3개 이므로 [0]~[2]
   for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
         if (dfs(i, j)) {
            result++
         }
      }
   }

   console.log(result)

   process.exit()
})
