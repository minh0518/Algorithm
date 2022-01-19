const { off } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const data=[]

rl.on('line', (input) => {
    data.push(input)  
 }).on('close',()=>{

    let S=data[0]
    let sum=0
    let stringData=[]
    let result
    for(let i of S){
      if(i.charCodeAt(0)>=65){
        stringData.push(i)
      }
      else{
          sum+=Number(i)
      }
      
    }

    result=(stringData.sort())

    if(sum!=0){
      result.push(sum)
    }
    
    console.log(result.join(''))
    //join으로 배열을 하나의 값으로 합침
    


    process.exit();
})