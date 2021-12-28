const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data=[]

rl.on('line', (input) => {
    data.push(input);
 }).on('close',()=>{ 

    let T= +data[0]
    let R
    let S
    let result='';
    for(let i=1; i<=T; i++){
        R= +data[i].split(' ')[0];
        S=data[i].split(' ')[1];    

        for(let i=0; i<S.length; i++){
            for(let j=0; j<R; j++){
                result+=S[i];
            }
        }
        console.log(result)
        result=''
    }
    
    
    

  process.exit();
})