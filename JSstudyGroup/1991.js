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

  data.shift()

  let vertex=data.map(item=>item.split(' '))

  // let graph=Array.from(new Array(N), (e,i) => [String.fromCharCode(65 + i)])
  // //[ [ 'A' ], [ 'B' ], [ 'C' ], [ 'D' ], [ 'E' ] ]

  let tree = {}

  for(let i=0; i<vertex.length; i++){
    const [node,left,right]=vertex[i]
    tree[node]=[left,right]
  }

  //console.log(tree)

  let firstResult='' 
  //전위순회
  const first=node=>{
    if(node==='.') return
    firstResult+=node
    const [left,right]=tree[node]
    first(left)
    first(right)
  }



  let secondResult=''
  //중위순회
  const second=node=>{
    if(node==='.') return
    const [left,right]=tree[node]
    second(left)
    secondResult+=node
    second(right)
  }

  let thirdResult=''
  //후위순회
  const third=node=>{
    if(node==='.') return
    const [left,right]=tree[node]
    third(left)
    third(right)
    thirdResult+=node
  }
  
  
  first('A')
  second('A')
  third('A')


  console.log(firstResult)
  console.log(secondResult)
  console.log(thirdResult)
   

  process.exit()
})
