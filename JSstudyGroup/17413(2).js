const { count } = require('console')
const { off, mainModule } = require('process')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let S = data.shift().split('')

  let isTag=false
  let tmp=[]
  let result=[]

  for(let i of S){
    if(i==='<'){
      isTag=true
      result.push(tmp.reverse().join(''))
      result.push(i)
      tmp=[]
    }
    else if(i==='>'){
      isTag=false
      result.push(tmp.join('')) // °ıÈ£ ¾È¿¡ ÀÖ´ø ºÎºĞµé ÁË´Ù ³Ö¾îÁÜ
      result.push(i)
      tmp=[]
    }
    else {
      if(i===' '){
  
        if(!isTag){
          result.push(tmp.reverse().join(''))
        }
        else{
          result.push(tmp.join(''))
        }
        result.push(' ')
        tmp=[]
      }
      else{
        tmp.push(i)
      }
    }
    

  }
  
  result.push(tmp.reverse().join(''))

  console.log(result.join(''))

  process.exit()
})
