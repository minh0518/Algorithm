const { off, mainModule } = require('process')
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


  let N=Number(data.shift())
  let pair=Number(data.shift())

  let info=data.map(item=>item.split(' ').map(Number))

  let graph=new Array(N+1).fill().map(()=>[])

//  graph[0]=[]
  for(let i=0; i<info.length; i++){
    graph[info[i][0]].push(info[i][1])
    graph[info[i][1]].push(info[i][0])

  }

//  console.log(graph)

  let visited=new Array(graph.length).fill(false)

  let count=0


  const dfs=(graph,index,visited)=>{
    visited[index]=true
    count++

    for(let i of graph[index]){
      if(!visited[i]){
        dfs(graph,i,visited)
      }
    }
 
  }

  dfs(graph,1,visited)


  console.log(count-1)

  process.exit()
})