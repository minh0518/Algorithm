//해당 풀이는 정답 출력은 제대로 되지만 시간 초과가 걸립니다


function solution(id_list, report, k) {
    let status = id_list.map((item) => item.split())
    
    let info = report.map((item) => item.split(' '))

   // console.log(info)

    for (let i = 0; i < id_list.length; i++) {
      status[i].push(0)
    } //이름과 신고 횟수가 있는 2차원 배열을 만듬



    //중복신고 처리
    for(let i=0; i<info.length; i++){
      for(let j=i+1; j<info.length; j++){
        if(JSON.stringify(info[i])===JSON.stringify(info[j])){
         // console.log(info[i] , info[i])

          info.splice(j,1)
          j--

        }   
      }
    }

 // console.log(info)



    for (let i = 0; i < info.length; i++) {
      //신고목록을 돌면서 신고 횟수를 추가
      if(info[i][0]===info[i][1]){ //자기자신 신고한 것 배제
        continue
      }
      for (let j = 0; j < status.length; j++) {
        if (info[i][1]===status[j][0]) {

          status[j][1]++
        }
      }
    }



    //console.log(status)



    let answer = new Array(id_list.length).fill(0)



    for (let i = 0; i < status.length; i++) {
      if (status[i][1] >= k) {
        //신고횟수가 k번 이상이면

        for (let j = 0; j < info.length; j++) {
          if (info[j][1] === status[i][0]) {
            //신고목록에서 k번 이상인 사람이 신고당한 경우

              //info[j][0]은 신고 한 사람
            for (let k = 0; k < status.length; k++) {
              if (status[k][0] === info[j][0]) {
                answer[k]++
                
              }
            }
          }
        }
      }
    }

    //console.log(answer)

    return answer
  }