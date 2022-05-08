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

  function solution(s) {

    let words=['zero','one','two','three','four','five','six','seven','eight','nine']

    
    for(let i=0; i<words.length; i++){
      
      while(1){
          let idx=s.indexOf(words[i])
          if(idx===-1){
            break
          }
          s=s.replace(words[i],i)  
      }
      

    }

    
    
    
    return Number(s)
}
 

  // solution("one4seveneight")
  // solution("23four5six7")
  // solution("2three45sixseven")
  // solution("123")
  solution("oneone4seveneight")

  process.exit()
})
// let a='hellomynameisminho'

//   console.log(a.indexOf('name'))


