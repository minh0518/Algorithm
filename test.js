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

  const graph = [
    [],
    [2, 3, 8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7],
  ]

  let visited = new Array(9).fill(false)

  const dfs=(graph,startNode)=>{

    let stack=[]

    stack.push(startNode)

    while(stack.length){
        let node=stack.shift()
        if(!visited[node]){ //visited배열 값 확인
            console.log(node)//바로 정답 출력
            visited[node]=true
            stack=[...graph[node],...stack]
        }
    }
  }
  dfs(graph,1)
  

  process.exit()
})