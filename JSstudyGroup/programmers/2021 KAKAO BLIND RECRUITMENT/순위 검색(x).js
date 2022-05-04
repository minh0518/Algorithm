
//출력은 제대로 되지만 런타임 에러가 발생
//이 문제는 반드시 이진 탐색이 필요하다

function solution(info, query) {


    info=info.map(item=>item.split(' '))

    //console.log(info)

    let require=query.map(item1=>{
      return item1.split(' ').filter(item2=>{ 
																			//이걸 map으로 돌면서 splice로 
                                          //하는 것도 가능할듯
        return item2!=='and' 
      })
    })
    //console.log(require)


    // let tmp=[]
    // for(let i=0; i<require.length; i++){
    //   for(let j=0; j<require[i].length; j++){
    //     //j가 각 행의 열들을 의미

    //     if(require[i][j]!=='-'){

    //       info.map(item=>{
    //                                     //반드시 형 변환 해줘야 함
    //         if(!isNaN(item[j]) && item[j]>=Number(require[i][j])){ //숫자라면
    //           tmp.push(item[j])
    //         }
    //         else if(item[j]===require[i][j]){
    //           tmp.push(item[j])
    //         }
            
    //       })
    //     }
        

    //   }
    // }
    // console.log(tmp)


    let answer=[]
    
    for(let i=0; i<require.length; i++){ //각 행을 기준으로

      let tmp=new Array(require.length).fill().map(()=>[]) 
			//매 요구사항 (=require의 각 행)마다 새로운 배열을 만들어서
			//비교 결과를 담아줌

      for(let j=0; j<require[i].length; j++){ //열의 값들을 비교
        for(let k=0; k<info.length; k++){
									//어차피 각 행에서 비교하는 열의 인덱스는 동일하므로 
                  //4중for문까진 필요하지 않다

            if(!isNaN(require[i][j])){
              if(require[i][j]<=Number(info[k][j])){
                tmp[k].push(info[k][j])  
              }
            }
            else if(require[i][j]!=='-'&&require[i][j]===info[k][j]){ 
              
              tmp[k].push(info[k][j])
            }
            
          }
        }
      
  
        let count=0
        for(let x=0; x<tmp.length; x++){
          if(tmp[x].length===(require[i].filter(item=>item!=='-')).length){
            count++
          }
        }
        answer.push(count)
        
      }
  
        
    
    

    //console.log(answer)


    
    return answer;
}


console.log(solution(["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"],["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]))