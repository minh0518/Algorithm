const { off } = require('process')
const readline = require('readline')
const { callbackify } = require('util')
const { deflateSync } = require('zlib')

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
})

const data = []

rl.on('line', (input) => {
   data.push(input)
}).on('close', () => {
   let [N, M] = data.shift().split(' ').map(Number)

   const bfs = (a, b) => {
      let queue = []

      queue.push([a, b])

      while (queue.length) {
         let [x, y] = queue.shift()  
         for (let i = 0; i < 4; i++) {
            let nx = x + dx[i] // nx가 rols
            let ny = y + dy[i] // ny가 cols
            if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
               continue
            }
            if (graph[nx][ny] === 0) {
               continue
            }
            if (graph[nx][ny] === 1) {
              // console.log(`현재 방문한 곳은 ${nx},${ny}입니다`)
               graph[nx][ny] = graph[x][y] + 1
               queue.push([nx, ny])
            }
         }
      }
      return graph[N - 1][M - 1]
   }

   
   let graph = []

   graph=data.map(item=>item.split('').map(Number))

      //상 하 좌 우
   dx = [-1, 1, 0, 0]
   dy = [0, 0, -1, 1]

   console.log(bfs(0,0))




   process.exit()
})
