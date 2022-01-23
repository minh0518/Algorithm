const { off } = require('process');
const readline = require('readline');
const { callbackify } = require('util');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data=[]

const calc=((cord)=>{
  let tmp=cord.sort((a,b)=>a[0]-b[0]||a[1]-b[1])


  return tmp
  })



rl.on('line', (input) => {
    data.push(input)  
 }).on('close',()=>{

  let N=data.shift()

  let cord=data.map((item)=>item.split(' ').map(Number))

  let result=''
  calc(cord).map((item)=>{
    result+=`${item[0]} ${item[1]}\n`
  })

  console.log(result)

  process.exit();
})

