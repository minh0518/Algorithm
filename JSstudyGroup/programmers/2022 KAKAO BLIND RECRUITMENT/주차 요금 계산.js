function solution(fees, records) {

    let info=records.map(item=>item.split(' '))
    
    let status={}

    info.map(item=>{
      return status[item[1]]=[...(status[item[1]]||[]),item[0]]
    })

    for(let i in status){
      if(status[i].length%2!==0){
        status[i].push('23:59')
      }
      let tmp=[]
      for(let j=0; j<status[i].length; j++){
        //console.log(status[i][j])

        let gap1=new Date(`2022-01-01 ${status[i][j+1]}`)-new Date(`2022-01-01 ${status[i][j]}`)

        
        let gap2=60*(Number(Math.floor(gap1%(1000*60*60*24)/(1000*60*60))))+Number(Math.floor(gap1%(1000*60*60)/(1000*60)))
        
        tmp.push(gap2)
        j++
      }
      status[i]=tmp.reduce((a,b)=>a+b)
    }


    
    for(let i in status){
        if(status[i]<=fees[0]){
          status[i]=fees[1]
        }
        else{
          status[i]=(fees[1]+Math.ceil((status[i]-fees[0])/fees[2])*fees[3])
        }
      
    }
    
    // console.log(fees)
    // console.log(info)
    // console.log(status)


    let answer=[]

    Object.keys(status).sort((a,b)=>a-b).map(item=>{
      answer.push(status[item])
    })

    return answer;
}

//console.log(solution([180, 5000, 10, 600],["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]))