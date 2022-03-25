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

  let reverseWord=[]

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
    reverseWord.push(tmp)
  }

 // console.log(reverseWord)

  let result=reverseWord.sort((a,b)=>{
    return a.localeCompare(b)
  })

  console.log(result[0])
  

})

//문자열 정렬은 아스키코드 기준

