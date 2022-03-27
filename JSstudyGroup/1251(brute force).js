const { resolve } = require('path')
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

  let word=data.shift()

  let reversedWord=[]

  let dividedWord=[]
  
  
  for(let i=1; i<word.length; i++){
    for(let j=i+1; j<word.length; j++){
      dividedWord.push([word.slice(0,i),word.slice(i,j),word.slice(j)])
    }
  }

  // console.log(dividedWord)

  for(let i=0; i<dividedWord.length; i++){ 
    let tmp=''
    for(let k=0; k<3; k++){
    tmp+=dividedWord[i][k].split('').reverse().join('')
    }
    reversedWord.push(tmp)
  }

 // console.log(reversedWord)

  let result=reversedWord.sort((a,b)=>{
    return a.localeCompare(b)
  })

  console.log(result[0])
  

})



