const { off, mainModule, resourceUsage } = require('process')
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
  function solution(info, query) {


    info=info.map(item=>item.split(' '))

    console.log(info)

    let require=query.map(item1=>{
      return item1.split(' ').filter(item2=>{ //이걸 map으로 돌면서 splice로 
                                          //하는 것은 안 되려나
        return item2!=='and' 
      })
    })

    console.log(require)

    let answer=[]
    
    for(let i=0; i<require.length; i++){
      let tmp=new Array(require.length).fill().map(()=>[]) 

      for(let j=0; j<require[i].length; j++){ //각 행의 열 정보들을 비교
        for(let k=0; k<info.length; k++){

            if(!isNaN(require[i][j])){
              if(require[i][j]<=Number(info[k][j])){
                tmp[k].push(info[k][j])  
              }
            }
            else if(require[i][j]!=='-'&&require[i][j]===info[k][j]){ 
                  //어차피 각 행의 비교하는 인덱스는 동일하므로 
                  //4중for문까진 필요x
              
              tmp[k].push(info[k][j])
            }
            
          }
        }
      
        console.log(tmp)
  
        let count=0
        for(let x=0; x<tmp.length; x++){
          if(tmp[x].length===(require[i].filter(item=>item!=='-')).length){
            count++
          }
        }
        answer.push(count)
        
      }
  
        
    
    

    console.log(answer)


    
    return answer;
}


console.log(solution(["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"],["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]))


  process.exit()
})

//배욜 요소 제거
