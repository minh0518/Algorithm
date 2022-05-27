const { off } = require('process')
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


   let inputString=data.shift().split('')
   let M=+data.shift()
   let command=data.map(item=>item.split(' '))

   let cursor=inputString.length

   for(let i=0; i<command.length; i++){
      let cmd=command[i][0]
      if(cmd==='L'){
         if(!cursor){
            continue
         }
         cursor--
      }
      else if(cmd==='D'){
         if(cursor===inputString.length){
            continue
         }
         cursor++
      }
      else if(cmd==='B'){
         if(!cursor){
            continue
         }    
         console.log(cursor)
         inputString.splice(cursor - 1, 1); 
         //인덱스 하나뒤로 뺀곳에서부터 1개를 삭제
         //즉 커서 앞에 있는 문자를 삭제
                                            
         cursor--  
      }
      else if(cmd==='P'){
         inputString.splice(cursor,0,command[i][1])
         cursor++
      }
   }

   
   console.log(inputString)

  process.exit()
})
