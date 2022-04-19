const { off, mainModule } = require('process')
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
        }
        
        
      }
    }
//여기서 처리할때 그냥 인덱스가 꼬이는 것 같으니까
//차라리 새로 배열하나 만들어서 조건문 통과하면 그 때 info배열에 다시 push해주는
//방식으로 해봐야겠다


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

              //info[j][0]은 신고 당한 사람
            for (let k = 0; k < status.length; k++) {
              if (status[k][0] === info[j][0]) {
                answer[k]++
                

                //자기자신을 신고할 경우, 중복신고 할 경우를 배제해야 함
              }
            }
          }
        }
      }
    }

    console.log(answer)

    return answer
  }

  solution(
    ["muzi", "frodo", "apeach", "neo"],
    ["muzi frodo", "apeach frodo", "muzi frodo", "muzi neo", "apeach muzi"],
    2,
  )



  // let a=[[1,2],[3,4],[5,6]]
  // let b=[[1,2],[3,4],[5,6]]
  // console.log(JSON.stringify(a[1])===JSON.stringify(b[2]))


  // let a=[1,2,3,4]
  // a.splice(2,1) //원본을 바꾸네 ㅁㅊ
  // console.log(a)

  process.exit()
})
