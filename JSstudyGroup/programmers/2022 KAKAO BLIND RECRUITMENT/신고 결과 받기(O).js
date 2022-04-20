function solution(id_list, report, k) {

    let status={}

    id_list.map(item=>status[item]=[])
  //{ muzi: [], frodo: [], apeach: [], neo: [] }
//키는 신고 당한 유저
//값은 키를 신고한 유저들

    report.map(item=>{
      let [user_id,report_id]=item.split(' ')
      if(!(status[report_id].includes(user_id))){
          //stataus에서 신고당한 유저의 값에 지금 신고한 사람의 이름이 없으면
          status[report_id].push(user_id)   
      } 
    })

   // console.log(status)


    let answer=new Array(id_list.length).fill(0)
    for(let i in status){
      if(status[i].length>=k){
        status[i].map(item=>{
          return answer[id_list.indexOf(item)]++
          //status를 돌면서 k번 이상 신고당한 사람을 
          //신고한 사람이 있을 것이다.
          //id_list에서 그 사람의 인덱스를 찾아서 똑같이 answer에 더함
          //(결과또한 id_list에 입력받은 순서대로 값을 매기기 때문)
        })
      }
    }

    return answer
  }