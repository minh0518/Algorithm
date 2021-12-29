const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data=[]

rl.on('line', (input) => {
    data.push(input)
 }).on('close',()=>{ 

  let count=Number(data[0])
  let result=0;



  for(let i=1; i<=count; i++){
      let word=data[i]
      let status=true;
      let letter=[]
      for(let j=0; j<word.length; j++){
        
       if(letter.indexOf(word[j]) == -1){
         letter.push(word[j])
       }
       else{
         if(letter.indexOf(word[j]) != (letter.length)-1 ){
           status=false
           break;
         } 
        }

      }

      if(status){
        result++;
      }
  }

  console.log(result);

  process.exit();
})