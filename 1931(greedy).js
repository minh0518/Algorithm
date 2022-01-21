const { off } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const data=[]

const schedule=function(data){
  let tmp=data.map((item)=>(item.split(' ')).map(Number))

   let sortSchedule=tmp.sort((a,b)=>a[1]-b[1]||a[0]-b[0])

   return sortSchedule
}

rl.on('line', (input) => {
    data.push(input)  
 }).on('close',()=>{

    let N=Number(data.shift())
    
    let sortSchedule=schedule(data)


    let [result,recentEnd]=[0,0]


    sortSchedule.map(([start,end])=>{
      if(start>=recentEnd){
        result++
        recentEnd=end
      }
    })

    console.log(result)


    process.exit();
})

